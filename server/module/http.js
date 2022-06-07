const request = require('request')

let http = async (token, thirdPartyEnterParams, config) => {
  //请求异常处理  token过期等

  //业务异常处理
  //封装promise
  console.log(token)
  return await new Promise((resolve, reject) => {
    // request(
    //   {
    //     url: config.serviceHttpUrl,
    //     method: config.serviceHttpType,
    //     json: true,
    //     headers: {
    //       'content-type': 'application/json',
    //       timestamp: timestamp,
    //       appKey: appKey,
    //       sign: sign,
    //       version: '1.0.0',
    //     },
    //     body: thirdPartyEnterParams,
    //   },
    //   function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //       resolve(body)
    //     } else {
    //       reject()
    //     }
    //   }
    // )
  })
}

module.exports = {
  request: http,
}
