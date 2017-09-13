import fetch, { RequestInit } from 'node-fetch';
import sendMail from './mail'
// import * as cheerio from "cheerio";

let lastchapterCount: number;
const bookId = '672340';
const domain = 'http://m.zongheng.com/h5/ajax/';
const cookie = '___bz=672340|38805323|2c6811|aladin2_freexx;';

const request = async (url: string) => {
  const parmas: RequestInit = {
    method: 'GET',
    headers: {
      Cookie: cookie
    }
  }

  const response = await fetch(domain + url, parmas);
  if (response.status === 200) {
    return await response.json();
  } else {
    console.log(domain + url);
    return request(url);
  }
}

async function check(bookName: string) {
  // 获取总章节数
  const { chapterlist: { chapterCount } } = (await request(`chapter/list?h5=1&bookId=${bookId}&pageSize=1&pageNum=1`));
  (!lastchapterCount) && (lastchapterCount = chapterCount);
  if (chapterCount <= lastchapterCount) {
    return;
  }
  // 获取更新章节列表
  const { chapterlist: { chapters } }: { chapterlist: { chapters: any[] }, } = await request(`chapter/list?h5=1&bookId=${bookId}&pageSize=${lastchapterCount}&pageNum=2`)
  chapters.forEach(async chapter => {
    const { chapterName, chapterId } = chapter;
    let html = '',
      pageCount: number,
      chapterNum = 0,
      content: string;
    do {
      ({ result: { pageCount, chapterNum, content } } = await request(`chapter?bookId=${bookId}&chapterId=${chapterId}_${chapterNum + 1}`));
      html += content;
    } while (chapterNum < pageCount);
    sendMail(chapterName, html);
  })
  console.log('update');
  lastchapterCount = chapterCount;
}

check();
setInterval(check, 600000)