import workHitlistHtml from './workHitlistHtml'
import { workFormHtml } from './timetrack'
import { sendHtml } from './timetrack'

const show = function(db, res, showArchived) {
  let sql = 'SELECT * FROM work WHERE archived=? ORDER BY date DESC';
  let archiveValue = showArchived ? 1 : 0;
  db.query(sql, [archiveValue], (err, rows) => {
    if (err) throw err;
    let html = showArchived ? '' : '<a href="/archived">Archived Work</a><br>';
    html += workHitlistHtml(rows);
    html += workFormHtml();
    sendHtml(res, html);
  })
};

const showArchived = function(db, res) {
  show(db, res, true);
}

export {
  show,
  showArchived
}