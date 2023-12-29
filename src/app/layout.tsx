import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globalStyles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "당첨결과 반영중",
  description: "동행복권 당첨 결과, 확인하는 웹 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 dark:bg-gray-900 h-dvh ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
