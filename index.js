const Base64 = require('js-base64')
function getParams(event) {
  let body = (event.body && Base64.decode(event.body)) || {}
  try {
    body = JSON.parse(body)
  } catch (err) {
    return '参数解析异常'
  }
  return body
}

const Entrance = {
  initializer: async (context, callback) => {
    const Redis = require('./server/util/redis')
    await Redis.install(context)
  },
  handler: async (event, context) => {
    const Auth = require('./server/module/Auth.js')
    const Config = require('./server/module/Config.js')
    const RelationSwitch = require('./server/module/RelationSwitch')
    const Http = require('./server/module/Http.js')
    const ResultModule = require('./server/util/result')

    const apiID = event.requestContext.apiId
    //通过apiID配置文件
    const config = await Config(apiID)
    //根据配置文件，调用对应的身份认证函数。得到authInfo
    const authInfo = await Auth.get(config.identityFunction, apiID)
    //根据配置对入参进行转化
    const enterParams = getParams(event)
    const thirdPartyEnterParams = await RelationSwitch.get(
      enterParams,
      config.enterParamMapping
    )
    //发起请求
    const thirdPartyResult = await Http(authInfo, thirdPartyEnterParams, config)
    //根据配置对出参进行转化
    const standardResult = await RelationSwitch.get(
      JSON.parse(thirdPartyResult),
      config.outParamMapping
    )
    console.log(standardResult)
    return ResultModule.success(standardResult)
  },
}

module.exports = Entrance
