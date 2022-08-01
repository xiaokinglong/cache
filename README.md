# 协商缓存和强缓存

```js
 res.setHeader('Expires', new Date(new Date().getTime() + 100 * 1000).toGMTString());
 res.setHeader('Cache-Control', 'Max-age=100');
```

## 强缓存
```js
    const ctime = statObj.ctime.toGMTString()

    res.setHeader('Last-modified', ctime)

    if (req.headers['if-modified-since'] == ctime) {
      return (res.statusCode == 304) && res.end();
    }

    const result = await fs.readFile(fileName);
      console.log(fileName)
      const hash = crypto.createHash('md5').update(result).digest('base64')
      // console.log({ hash })
      res.setHeader('Etag', hash)
      if (req.headers['if-none-match'] == hash) {
        return (res.statusCode == 304) && res.end();
      }
```
