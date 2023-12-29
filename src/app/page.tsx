"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import logo from "../../public/logo.png";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = loginInfo.id.trim();
    const password = loginInfo.password.trim();
    if (id === "" || password === "") return;

    const response = await fetch("http://localhost:3000/api/lotto/login", {
      method: "POST",
      body: JSON.stringify({ id, password }),
    });
    const { data } = await response.json();

    if (data.message === "로그인 성공") {
      console.log(data.message);
      router.replace("/check");
      setLoginInfo({
        id: "",
        password: "",
      });
    } else {
      console.log(data.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 relative">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-dvw"
        style={{
          background: `url('/bg.png') no-repeat center fixed`,
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(12,12,112,0.4)",
        }}
      ></div>
      <div className="flex flex-col items-center sm:items-end justify-center px-6 py-8 lg:py-0 sm:px-32 h-dvh relative z-10">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white dark:bg-black dark:bg-opacity-40 p-2 rounded-xl"
        >
          <Image className="w-8 h-8 mr-2 rounded-xl" src={logo} alt="logo" />
          아니 이번에 번호 좋은데?
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              동행복권 계정을 입력해주세요.
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  아이디
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={loginInfo.id}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0 autofill:bg-yellow-200"
                  placeholder="동행복권 아이디"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={loginInfo.password}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="https://dhlottery.co.kr/customer.do?method=findIdPw"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  target="_blank"
                >
                  아이디/비밀번호 찾기
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    로그인 중...
                  </>
                ) : (
                  "로그인"
                )}
              </button>
              <p className="flex text-sm font-light text-gray-500 dark:text-gray-400 justify-end">
                계정이 없으신가요?
                <a
                  href="https://dhlottery.co.kr/loginJoin.do?method=joinFormAgree"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-2"
                  target="_blank"
                >
                  회원가입
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
