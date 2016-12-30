import qs from 'querystring'

// 发送HTML响应
const sendHtml = function(res, html) {
  res.setHeader('Content-type', 'text/html');
  res.setHeader('Content-length', Buffer.byteLength(html));
  res.end(html);
};

// 解析POST数据
const parseReceivedData = function(req, cb) {
  let body = '';
  req.setEncoding('utf8');
  req
    .on('data', chunk => {
      body += chunk;
    })
    .on('end', () => {
      let data = qs.parse(body);
      cb(data);
    });
}

// 渲染简单表单
const actionForm = function(id, path, label) {
  let html = `<form method='POST' action='${path}'>
  <input type='hidden' name='id' value=${id}>
  <input type='submit' value=${label}>  
  </form>`;
  return html;
};

// 将工作记录渲染为HTML表格
const workHitlistHtml = function(rows) {
  let html = '<table>';
  for (let ii in rows) {
    html += `<tr>
    <td>${rows[ii].date}</td>
    <td>${rows[ii].hours}</td>
    <td>${rows[ii].description}</td>`;
    if (!rows[ii].archived) {
      html += `<td>${workArchiveForm(rows[ii].id)}</td>`;
    }
    html += `<td>${workDeleteForm(rows[ii].id)}</td></tr>`;
  }
  html += '</table>';
  return html;
}

// 渲染用来输入新工作记录的空白HTML表单
const workFormHtml = function() {
  let html = `<form method='POST' action='/'>
  <p>Date (YYYY/MM/DD):</br><input name='date' type='date'></p>
  <p>Hours worked:<br><input name='hours' type='number'></p>
  <p>Description:<br><textarea name='description'></textarea></p>
  <input type='submit' value='Add'>
  </form>`;
  return html;
}

// 渲染归档按钮表单
const workArchiveForm = function(id) {
  return actionForm(id, '/archive', 'Archive');
}

// 渲染删除按钮表单
const workDeleteForm = function(id) {
  return actionForm(id, '/delete', 'Delete');
}

export {
  sendHtml,
  parseReceivedData,
  workHitlistHtml,
  workFormHtml,
  workArchiveForm,
  workDeleteForm
}