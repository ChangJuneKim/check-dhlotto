"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/check") return null;
  return (
    <div>
      <Link
        href="/check"
        scroll={false}
        className="fixed top-0 left-0 right-0 bottom-0 z-40 w-dvw bg-black bg-opacity-50"
      />
      {children}
    </div>
  );
}
