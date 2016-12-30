import { workArchiveForm, workDeleteForm } from './timetrack'

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

export default workHitlistHtml