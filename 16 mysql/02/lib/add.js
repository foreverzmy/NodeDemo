// 添加工作记录
import { parseReceivedData } from './timetrack'
import { show } from './show'

const add = function(db, req, res) {
  parseReceivedData(req, work => {
    db.query(
      'INSERT INTO work (hours,date,description) VALUES (?,?,?)', [work.hours, work.date, work.description], err => {
        if (err) throw err;
        show(db, res);
      }
    )
  })
}

export default add