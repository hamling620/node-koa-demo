function postData (ctx) {
  return new Promise((resolve) => {
    let postData = ''
    ctx.req.on('data', chunk => {
      postData += chunk.toString()
    }) 

    ctx.req.on('end', () => {
      resolve(postData)
    }) 
  })
}

function parseQueryString (str) {
  if (typeof str !== 'string') {
    throw new Error('param must be a string')
  }
  const queryData = {}
  const strList = str.split('&')
  for (const str of strList) {
    const [key, value] = str.split('=')
    queryData[key] = decodeURIComponent(value)
  }
  return queryData
}

module.exports = {
  postData,
  parseQueryString
}