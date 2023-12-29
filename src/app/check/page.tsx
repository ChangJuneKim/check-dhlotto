"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Check() {
  const router = useRouter();
  const [id, setId] = useState("");

  const handleTest = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/lotto`, {
        method: "POST",
        body: JSON.stringify({ number: id }),
      });

      const { data, message } = await response.json();
      if (message === "세션 만료") router.replace("/");

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 relative">
      <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 sm:px-32 h-dvh relative z-10">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white text-center">
              구매 내역의 선택번호/복권번호를
              <br />
              입력해주세요.
              <svg
                onClick={() => router.push("/check/help")}
                className="inline-block align-middle ml-2 -translate-y-0.5 hover:text-primary-500 cursor-pointer transition"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracurrentColorerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_icurrentColoronCarrier">
                  <path
                    fillRule="evenodd"
                    d="M10.661 7.86213C10.4142 8.04749 10.25 8.31328 10.25 8.75C10.25 9.30228 9.80229 9.75 9.25 9.75C8.69772 9.75 8.25 9.30228 8.25 8.75C8.25 7.68672 8.70818 6.82751 9.46005 6.26288C10.1787 5.72317 11.0967 5.5 12 5.5C13.0779 5.5 13.987 5.82418 14.6436 6.44499C15.2951 7.06101 15.6046 7.88116 15.6531 8.7005C15.7483 10.3042 14.864 12.0687 13.2461 12.9932C13.099 13.0773 13.008 13.1462 12.9529 13.1958C13.0783 13.5886 12.9509 14.0345 12.6034 14.2974C12.163 14.6307 11.5359 14.5438 11.2026 14.1034C11.2026 14.1034 11.2031 14.1041 11.2016 14.1021L11.2005 14.1007C10.9606 13.778 10.865 13.355 10.9137 12.9585C10.9974 12.277 11.4727 11.7031 12.2539 11.2568C13.2157 10.7071 13.7065 9.65911 13.6567 8.8189C13.6328 8.41625 13.4898 8.10656 13.2695 7.89822C13.0542 7.69468 12.6721 7.5 12 7.5C11.3981 7.5 10.9411 7.65183 10.661 7.86213Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={() => {}}>
              <div>
                <label
                  htmlFor="num"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  선택번호/복권번호
                </label>
                <input
                  type="text"
                  name="num"
                  id="num"
                  // value={loginInfo.id}
                  // onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0 autofill:bg-yellow-200"
                  placeholder="선택번호/복권번호"
                  required
                />
              </div>
              {/*<button*/}
              {/*  type="submit"*/}
              {/*  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"*/}
              {/*>*/}
              {/*  {true ? (*/}
              {/*    <>*/}
              {/*      <svg*/}
              {/*        aria-hidden="true"*/}
              {/*        role="status"*/}
              {/*        className="inline mr-3 w-4 h-4 text-white animate-spin"*/}
              {/*        viewBox="0 0 100 101"*/}
              {/*        fill="none"*/}
              {/*        xmlns="http://www.w3.org/2000/svg"*/}
              {/*      >*/}
              {/*        <path*/}
              {/*          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"*/}
              {/*          fill="#E5E7EB"*/}
              {/*        ></path>*/}
              {/*        <path*/}
              {/*          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"*/}
              {/*          fill="currentColor"*/}
              {/*        ></path>*/}
              {/*      </svg>*/}
              {/*      로그인 중...*/}
              {/*    </>*/}
              {/*  ) : (*/}
              {/*    "로그인"*/}
              {/*  )}*/}
              {/*</button>*/}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
