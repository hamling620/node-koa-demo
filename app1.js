const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const user = new Router()
user.get('/', ctx => {
  ctx.body = 'User Index'
}).get('/profile', ctx => {
  const { id } = ctx.query
  ctx.body = 'User Profile' + (id || '')
})

const blog = new Router()
blog.get('/', ctx => {
  ctx.body = 'Blog Index'
}).get('/me', ctx => {
  ctx.body = 'Blog Me'
})

app.use(bodyParser())

const router = new Router()

router.use('/user', user.routes(), user.allowedMethods())
router.use('/blog', blog.routes(), blog.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, err => {
  if (err) return console.error(err)
  console.log('The Server Running At http://localhost:3000')
})