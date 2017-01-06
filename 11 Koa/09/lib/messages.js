export default ctx => {
  console.log(ctx)
  ctx.message = function(msg, type = 'info') {
    console.log(msg);
    console.log(ctx.req.session);
  }
  ctx.error = function(msg) {
    return ctx.message(msg, 'error');
  }
}