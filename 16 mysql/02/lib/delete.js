// 删除工作记录
import { parseReceivedData } from './timetrack'
import { show } from './show'

const delet = function(db, req, res) {
  parseReceivedData(req, work => {
    db.query(
      'DELETE FROM work WHERE id=?', [work.id], err => {
        if (err) throw err;
        show(db, res);
      }
    )
  })
}

export default delet