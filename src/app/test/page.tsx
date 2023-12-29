"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Test() {
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
    <>
      <input
        type="text"
        placeholder="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mb-4 p-2 border-2 border-gray-300"
      />
      <button onClick={handleTest}>test</button>
    </>
  );
}
