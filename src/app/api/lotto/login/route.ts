import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { id, password } = await request.json();

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let message = ""; // 대화 상자 메시지를 저장할 변수

  // alert 창이 나타나면 메시지를 저장하고 자동으로 닫습니다.
  page.on("dialog", async (dialog) => {
    message = dialog.message(); // 대화 상자 메시지 저장
    console.log("Alert detected: ", message);
    await dialog.dismiss();
  });

  // 페이지 로딩 완료 대기
  await page.goto("https://dhlottery.co.kr/user.do?method=login&returnUrl=", {
    waitUntil: "networkidle0", // 네트워크 활동이 없을 때까지 기다립니다.
  });

  await page.type("#userId", id);
  await page.type("[type=password]", password);

  // 리다이렉트를 처리하기 위한 navigationPromise 설정
  const navigationPromise = page.waitForNavigation({
    waitUntil: "networkidle0",
  });

  await page.click(".btn_common.lrg.blu");

  // 리다이렉트 완료 대기
  await navigationPromise;

  // 리다이렉트 후 필요한 요소가 페이지에 있는지 확인
  // 예를 들어, 로그아웃 버튼이나 사용자 이름 등을 확인
  const isLoggedIn = await page.evaluate(() => {
    const logoutButton = document.querySelector(
      "ul.account li.log.devide a.btn_common.sml"
    );
    return (
      logoutButton !== null && logoutButton.textContent?.includes("로그아웃")
    );
  });

  // 리다이렉트 후 로그인 성공 여부 확인
  const isSuccess = await page.evaluate(() => {
    const logoutButton = document.querySelector(
      "ul.account li.log.devide a.btn_common.sml"
    );
    return logoutButton && logoutButton.textContent?.includes("로그아웃");
  });

  if (!isSuccess) {
    await browser.close();
    return NextResponse.json({ data: { message: "로그인 실패" } });
  }

  const lottoAuth = await page.cookies();
  cookies().set("lottoAuth", JSON.stringify(lottoAuth));
  await browser.close();
  return NextResponse.json({ data: { message: "로그인 성공" } });
}
