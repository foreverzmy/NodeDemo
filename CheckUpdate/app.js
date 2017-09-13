const fetch = require('node-fetch');
// import * as cheerio from "cheerio";
const sendMail = require('./mail');

let lastchapterCount;
const bookId = '672340';
const domain = 'http://m.zongheng.com/h5/ajax/chapter';
const cookie = '___bz=672340|38805323|2c6811|aladin2_freexx;';

const request = async(url) => {
    const parmas = {
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

async function check() {
    const {
        chapterlist: {
            chapterCount
        }
    } = (await request(`/list?h5=1&bookId=${bookId}&pageSize=1&pageNum=1`));
    (!lastchapterCount) && (lastchapterCount = chapterCount);
    if (chapterCount <= lastchapterCount) {
        return;
    }
    console.log(chapterCount);
    const {
        chapterlist: {
            chapters
        }
    } = await request(`/list?h5=1&bookId=${bookId}&pageSize=${lastchapterCount}&pageNum=2`)
    chapters.forEach(async chapter => {
        const {
            chapterName,
            chapterId
        } = chapter;
        let html = '',
            pageCount, chapterNum = 0,
            content;
        do {
            ({
                result: {
                    pageCount,
                    chapterNum,
                    content
                }
            } = await request(`?bookId=${bookId}&chapterId=${chapterId}_${chapterNum + 1}`));
            html += content;
        } while (chapterNum < pageCount);
        sendMail(chapterName, html);
    })
    console.log('update');
    lastchapterCount = chapterCount;
}

check();
setInterval(check, 600000)