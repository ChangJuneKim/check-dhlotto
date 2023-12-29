"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (id.trim() === "" || password.trim() === "") return;

    const response = await fetch("http://localhost:3000/api/lotto/login", {
      method: "POST",
      body: JSON.stringify({ id, password }),
    });
    const { data } = await response.json();

    if (data.message === "로그인 성공") {
      console.log(data.message);
      router.replace("/test");
    } else {
      console.log(data.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="mb-4 p-2 border-2 border-gray-300"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border-2 border-gray-300"
        />
        <button onClick={handleLogin}>로그인</button>
      </div>
    </main>
  );
}
