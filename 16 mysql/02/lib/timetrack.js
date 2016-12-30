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


const workFormHtml = function() {
  let html = `<form method='POST' action='/'>
  <p>Date (YYYY-MM-DD):</br><input name='date' type='text'></p>
  <p>Hours worked:<br><input name='hours' type='text'></p>
  <p>Description:<br><textarea name='description'></textarea></p>
  <input type='submit' value='Add'>
  </form>`;
  return html;
}

const workArchiveForm = function(id) {
  return actionForm(id, '/archive', 'Archive');
}

const workDeleteForm = function(id) {
  return actionForm(id, '/delete', 'Delete');
}

export {
  sendHtml,
  parseReceivedData,
  workFormHtml,
  workArchiveForm,
  workDeleteForm
}