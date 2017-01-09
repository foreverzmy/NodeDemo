import pug from 'pug'

function blogPage(entries) {
  let values = { entries: entries };
  return pug.renderFile('./views/blogPage.pug', values);
}

export default blogPage