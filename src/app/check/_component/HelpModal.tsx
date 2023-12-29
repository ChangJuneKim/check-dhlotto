import Link from "next/link";
import Image from "next/image";
import lotto from "../../../../public/lotto.png";
import Modal from "@/component/Modal";

export default function HelpModal() {
  return (
    <Modal>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden w-full max-w-4xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-12 pt-14 pb-8">
        <Link
          href="http://localhost:3000/check"
          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute top-3 right-3"
        >
          <span className="sr-only">모달 닫기</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
        <Image
          src={lotto}
          alt="선택번호, 복권번호"
          className="rounded-2xl"
          priority
        />
        <div className="mt-4 text-white">
          <p className="mb-1">마이페이지 ➡️ 구매/당첨 ➡️ 구매당첨내역</p>
          <a
            href="https://dhlottery.co.kr/myPage.do?method=lottoBuyListView"
            target="_blank"
            className="text-primary-500 hover:text-primary-700"
          >
            링크
          </a>
        </div>
      </div>
    </Modal>
  );
}
