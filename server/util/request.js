/*
 * @Description: 异步请求简单封装
 * @Author: 周丽
 * @Date: 2022-6-7
 */
const request = require('request')

function post(url, data, isJson = true) {
  let options = {
    url,
    method: 'POST',
    json: true,
    body: JSON.stringify(data),
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, data) => {
      if (err) return reject(err)
      if (res.statusCode == 200) resolve(data)
    })
  })
}

function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    request(
      url,
      {
        method: 'GET',
        qs: params,
      },
      (err, res, body) => {
        if (err) return reject(err)
        else if (res.statusCode == 200) resolve(body)
      }
    )
  })
}

module.exports = {
  post,
  get,
}
