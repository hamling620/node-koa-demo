const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const PORT = 3000

async function route (pathname) {
  let page = ''
  switch (pathname) {
    case '/':
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
function parseQueryString (querystring) {
  if (typeof querystring !== 'string') {
    throw new Error('querystring must be a string')
  }
  const strArr = querystring.split('&')
  const data = {}
  for (const str of strArr) {
    const [key, value] = str.split('=')
    data[key] = decodeURIComponent(value)
  }
  return data
}

function render (page) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'pages', page), 'utf-8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function handlePostData (req) {
  return new Promise((resolve) => {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resolve(postData)    
    })
  })   
}

async function serverHandler (req, res) {
  if (req.method === 'POST') {
    const postData = await handlePostData(req)
    const data = parseQueryString(postData)
    return res.end(JSON.stringify(data))
  }
  const pathname = url.parse(req.url, true).pathname
  const data = await route(pathname)
  res.end(data)
}

http.createServer(serverHandler).listen(PORT, err => {
  if (err) return console.error(err)
  console.log(`Server running at http://localhost:${PORT}`)
})