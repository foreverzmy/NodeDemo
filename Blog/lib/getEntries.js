// 读取和解析博客文章文本
import fs from 'fs'

let getEntries = function() {
  var entries = [];
  // 读取博客文章数据
  let entriesRaw = fs.readFileSync('./source/entries.txt', 'utf8');
  // 解析文本，将它们分成一篇篇文章
  entriesRaw = entriesRaw.split('---');
  entriesRaw.map(entryRaw => {
    let entry = {};
    let split;
    if (/win/.test(process.platform)) {
      split = '\r\n';
    } else if (/mac/.test(process.platform)) {
      split = '\r';
    } else {
      split = '\n';
    }
    let lines = entryRaw.split(split);
    lines.map(line => {
      if (line.indexOf('title:') === 0) {
        entry.title = line.replace('title:', '');
      } else if (line.indexOf('date:') === 0) {
        entry.data = line.replace('date:', '');
      } else {
        entry.body = entry.body || '';
        entry.body += line;
      }
    });
    entries.push(entry);
  });
  return entries;
}

export default getEntries