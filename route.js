const fs = require('fs')
const path = require('path')

function render (page) {
  return new Promise((resolve, reject) => {
    const pagePath = path.join(__dirname, 'pages', page)
    fs.readFile(pagePath, 'binary', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

async function route (url) {
  let page = ''
  switch (url) {
    case '/':
    case '/index':
      page = 'index.html'
      break
    case '/about':
      page = 'about.html'
      break
    default:
      page = '404.html'
  }
  return await render(page)
}

module.exports = {
  route
}