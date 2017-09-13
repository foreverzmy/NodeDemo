const fs = require('fs');
const path = require('path');
const office = require('officegen');

const docx = office('docx');

function createParagraphs() {
  let pObj = docx.createP();
  pObj.options.align = 'center';
  pObj.addText('Simple');
  pObj.addText(' with color', { color: '000088' });
  pObj.addText(' and back color.', { color: '00ffff', back: '000088' });
  pObj.addText('Bold + underline', { bold: true, underline: true });
  pObj.addText('Fonts face only.', { font_face: 'Arial' });
  pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 });
  pObj.addImage(path.resolve(__dirname, `${__dirname}/images/大白.png`), { cx: 300, cy: 200 });
}

createParagraphs();
createParagraphs();

let out = fs.createWriteStream(__dirname + '/a.docx');
docx.generate(out);
out.on('close', function(done) {
  console.log('OK')
});