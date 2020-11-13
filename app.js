const Koa = require('koa')
const views = require('koa-views')
const path = require('path')

const app = new Koa()

app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}))

app.use(async ctx => {
  const title = 'Hello ejs'
  await ctx.render('index', {
    title
  })
})

app.listen(3000, err => {
  if (!err) console.log('http://localhost:3000')
})