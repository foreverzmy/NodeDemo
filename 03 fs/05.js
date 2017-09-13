// 移动文件
const fs = require('fs');

class Move {
  constructor(oldPath, newPath, callback) {
    this.oldPath = oldPath;
    this.newPath = newPath;
    this.callback = callback;
    console.log(this.oldPath);
    // 调用rename移动文件
    fs.rename(this.oldPath, this.newPath, err => {
      if (err) {
        // 如果出现EXDEV错误，用备用的复制技术
        if (err.code === 'EXDEV') {
          this.copy();
        } else { // 其它错误
          this.callback(err);
        }
        return;
      }
      this.callback();
    });
  }

  // 读取原来的文件并把它输出到目标路径
  copy() {
    let readStream = fs.createReadStream(this.oldPath);
    let writeStream = fs.createWriteStream(this.newPath);
    readStream.on('error', this.callback);
    writeStream.on('error', this.callback);
    readStream.on('close', () => {
      // 复制完成后删除原文件
      fs.unlink(this.oldPath, this.callback);
    });
    readStream.pipe(writeStream);
  }
}

let move = new Move('04.ja', '04.js', err => { if (err) throw err });