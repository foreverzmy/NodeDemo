import request from './request';
import config from './zongheng.config';

process.stdin.setEncoding('utf8');

process.stdout.write('Please input：')

process.stdin.on('data', novelName => {
  novelName = novelName.replace(/\n/, '');
  process.stdin.pause();
  search(novelName);
})

async function search(novelName) {
  const params = {
    h5: 1,
    keywords: novelName,
    pageNum: 1,
    field: 'all',
    pageCount: 5
  }
  const { searchBooks }: { searchBooks: any[] } = (await request(config.domain + config.seachUrl, params)).searchlist;
  searchBooks.forEach((book, idx) => {
    process.stdout.write(idx + 1 + ':' + book.bookName + '-' + book.authorName + '\n');
  });
  process.stdout.write('Please Choose:');
  process.stdin.on('data', num => {
    console.log(searchBooks[num].bookId)
  })
}





// let dot = '.';
// let timer = setInterval(async function () {
//   await process.stdout.write(`正在搜索中，请稍后${dot}\r`);
//   dot += '.';
// }, 1000)
// setTimeout(function () {
//   clearInterval(timer);
//   process.stdin.end();
// }, 5000);