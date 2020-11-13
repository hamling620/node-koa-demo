const Koa = require('koa')
const static = require('koa-static')
const path = require('path')

const app = new Koa()
app.use(static(path.join(__dirname, 'static')))

app.use(async ctx => {
  ctx.body = '直接访问logo.png即可'    
})

app.listen(3000, err => {
  if (!err) console.log('http://localhost:3000')
})