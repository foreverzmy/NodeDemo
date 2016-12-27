import fs from 'fs'

import sendFile from './sendFile'
import send404 from '../routes/send404'

function serverStatic(res, cache, absPath) {
  if (cache[absPath] !== undefined) { // 检查文件是否存在内存中
    sendFile(res, absPath, cache[absPath]) // 从内存中返回文件
  } else {
    fs.exists(absPath, (exists) => { // 检查文件是否存在
      if (exists) {
        fs.readFile(absPath, (err, data) => { // 从硬盘读取文件
          if (err) {
            send404(res);
          } else {
            cache[absPath] = data; // 从硬盘读取文件并返回
            sendFile(res, absPath, data);
          }
        })
      } else {
        send404(res);
      }
    })
  }
}

export default serverStatic