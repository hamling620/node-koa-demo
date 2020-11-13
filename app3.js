const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
  if (ctx.url === '/index') {
    ctx.cookies.set('MyName', 'hamling', {
      domain: 'localhost',
      path: '/index',
      maxAge: 1000 * 60 * 60 * 24,
      expires: new Date('2020-12-31'),
      httpOnly: false,
      overwrite: false
    })   
    ctx.body = 'cookie is ok' 
  } else {
    if (ctx.cookies.get('MyName')) {
      ctx.body = ctx.cookies.get('MyName')
    } else {
      ctx.body = 'hello world'
    }
  }
})

app.listen(3000, err => {
  if (!err) console.log('http://localhost:3000')
})