import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";

interface LottoNumber {
  num: number;
  match: boolean;
}

interface LottoEntry {
  type: string; // '수동' 또는 '자동'
  rank: string; // 등수 ('1등', '2등', ..., '낙첨')
  numbers: LottoNumber[];
}
export async function POST(request: NextRequest) {
  const lottoAuth = cookies().get("lottoAuth");
  const { number } = await request.json();

  if (lottoAuth) {
    const cookies = JSON.parse(lottoAuth.value);
    const browser = await puppeteer.launch({ headless: false }); // headless 모드를 false로 설정하여 브라우저를 볼 수 있게 함
    const page = await browser.newPage();
    // alert 창이 나타나면 자동으로 닫습니다.
    page.on("dialog", async (dialog) => {
      console.log("Alert detected: ", dialog.message());
      await dialog.dismiss();
    });

    await page.setCookie(...cookies);
    await page.goto(
      "https://www.dhlottery.co.kr/myPage.do?method=lotto645Detail&orderNo=20231228&barcode=591257849697276867177546937343&issueNo=1"
    );

    const content = await page.content();

    const dom = new JSDOM(content);
    const document = dom.window.document;

    if (document.body.childNodes.length === 0) {
      await browser.close();
      return NextResponse.json({
        data: { message: "세션 만료", data: null },
      });
    }

    const issue = document.querySelector(".date-info h3 strong")!.textContent;
    const issueNumber = issue!.match(/\d+/)![0]; // '1096'을 추출

    const dateElements = document.querySelectorAll(".date-info ul li span");
    const dates = Array.from(dateElements).map((el) =>
      el.nextSibling!.textContent?.trim()
    );

    const barcodeElements = document.querySelectorAll(
      ".date-info .barcode span"
    );
    const barcodes = Array.from(barcodeElements).map((el) => el.textContent);

    const entryElements = document.querySelectorAll(".selected li");
    const entries: Record<string, LottoEntry> = {};

    entryElements.forEach((entryElem) => {
      const labelElem = entryElem.querySelector("strong span");
      if (!labelElem) return; // label 요소가 없으면 이후 코드를 실행하지 않습니다.

      const label = labelElem.textContent!.trim();
      const typeElem = entryElem.querySelector("strong span + span");
      if (!typeElem) return; // type 요소가 없으면 이후 코드를 실행하지 않습니다.

      const type = typeElem.textContent!.includes("자동") ? "자동" : "수동";
      const rankMatch = typeElem.textContent!.trim().match(/\(([^)]+)\)/);
      if (!rankMatch) return; // rank 문자열을 찾을 수 없으면 이후 코드를 실행하지 않습니다.

      const rank = rankMatch[1];

      const numberElements = entryElem.querySelectorAll(".nums span span");
      const numbers = Array.from(numberElements).map((numElem) => {
        return {
          num: parseInt(numElem.textContent!.trim()),
          match: numElem.classList.contains("ball_645"),
        };
      });

      entries[label] = {
        type,
        rank,
        numbers,
      };
    });

    const totalPrize = document
      .querySelector(".total strong:nth-of-type(2)")!
      .textContent?.trim();

    const data = {
      issueNumber: parseInt(issueNumber),
      publishDate: dates[0],
      drawDate: dates[1],
      expiryDate: dates[2],
      barcodeNumbers: barcodes,
      totalPrize,
      entries,
    };

    // 브라우저 인스턴스를 종료합니다
    await browser.close();

    return NextResponse.json({
      message: "로또 데이터 불러옴",
      data,
    });
  }

  return NextResponse.json("OK");
}
