let identityModule = require('./server/module/auth.js')
let configModule = require('./server/module/getConfig.js')
let switchMoudle = require('./server/module/switch.js')
let httpMoudle = require('./server/module/http.js')
var redis = require('./server/util/redis')
let Base64 = require('js-base64')

function getParams(event) {
  let body = (event.body && Base64.decode(event.body)) || {}
  try {
    body = JSON.parse(body)
  } catch (err) {
    return '参数解析异常'
  }
  return body
}

exports.handler = async (event, context) => {
  await redis.install(context)
  //第一步，取apiID
  let apiID = event.requestContext.apiId
  //第二步，通过apiID配置文件
  const config = await configModule.getConfig(apiID)
  let identityFunction = config.identityFunction
  //根据配置文件，调用对应的身份认证函数。得到token
  const token = await identityModule.getToken(identityFunction)

  //根据配置对入参进行转化
  let enterParams = getParams(event)
  let thirdPartyEnterParams = await switchMoudle.getResult(
    enterParams,
    config.enterParamMapping
  )
  //拿到token和参数，发起请求
  let thirdPartyResult = await httpMoudle.request(
    token,
    thirdPartyEnterParams,
    config
  )

  // //根据配置对出参进行转化
  // let standardResult = await switchMoudle.getResult(
  //   thirdPartyResult,
  //   config.outParamMapping
  // )
  //返回标准数据给业务方
  const output = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    isBase64Encoded: false,
    body: JSON.stringify(token),
  }
  return output
}
