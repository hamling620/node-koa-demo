const fs = require('fs')
const path = require('path')

function readDirectory (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, 'utf-8', (err, files) => {
      if (err) return reject(err)
      resolve(files)
    })    
  })
}

async function getViewDirectory () {
  try {
    const files = await(readDirectory(path.join(__dirname, 'views')))
    console.log(files)
  } catch (err) {
    console.error(err)
  }
}

getViewDirectory()