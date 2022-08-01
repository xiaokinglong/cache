const http = require('http')
const url = require('url');
const path = require('path')
const fs = require('fs/promises');
const crypto = require('crypto');

http.createServer(async (req, res) =>  {
  const { pathname } = url.parse(req.url);
  const fileName = path.join(__dirname, pathname);
  
  // 设置强缓存
  res.setHeader('Expires', new Date(new Date().getTime() + 100 * 1000).toGMTString());
  res.setHeader('Cache-Control', 'Max-age=100');

  try {
    const statObj = await fs.stat(fileName)
    // 判断强缓存设置的时间
    const ctime = statObj.ctime.toGMTString()

    res.setHeader('Last-modified', ctime)

    if (req.headers['if-modified-since'] == ctime) {
      return (res.statusCode == 304) && res.end();
    }

    if (statObj.isFile()) {
      const result = await fs.readFile(fileName);
      console.log(fileName)
      const hash = crypto.createHash('md5').update(result).digest('base64')
      // console.log({ hash })
      res.setHeader('Etag', hash)
      if (req.headers['if-none-match'] == hash) {
        return (res.statusCode == 304) && res.end();
      }
      res.end(result)
    }
  } catch {
    res.end('404')
  }
  // res.end('哈哈哈')
}).listen(3000)