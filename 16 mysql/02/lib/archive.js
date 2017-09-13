// 归档一条工作记录
import { parseReceivedData } from './timetrack'
import { show } from './show'

const archive = function(db, req, res) {
  parseReceivedData(req, work => {
    db.query(
      `UPDATE work SET archived=1 WHERE id=?`, [work.id], err => {
        if (err) throw err;
        show(db, res);
      }
    )
  })
}

export default archive