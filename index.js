let identityModule = require('./server/module/auth.js')
let configModule = require('./server/module/getConfig.js')
let switchMoudle = require('./server/module/switch.js')
let httpMoudle = require('./server/module/http.js')
var redis = require('./server/util/redis')

var resultModule = require('./server/util/result')
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
  //取apiID
  const apiID = event.requestContext.apiId
  //通过apiID配置文件
  const config = await configModule(apiID)
  //根据配置文件，调用对应的身份认证函数。得到authInfo
  const authInfo = await identityModule.getAuth(config.identityFunction, apiID)
  //根据配置对入参进行转化
  const enterParams = getParams(event)
  const thirdPartyEnterParams = await switchMoudle.getResult(
    enterParams,
    config.enterParamMapping
  )
  //发起请求
  const thirdPartyResult = await httpMoudle(
    authInfo,
    thirdPartyEnterParams,
    config
  )
  //根据配置对出参进行转化
  const standardResult = await switchMoudle.getResult(
    JSON.parse(thirdPartyResult),
    config.outParamMapping
  )
  return resultModule.success(standardResult)
}
