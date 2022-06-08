const Entrance = {
  initializer: async (context, callback) => {
    const Redis = require('./server/util/redis')
    await Redis.install(context)
  },
  handler: async (event, context) => {
    const Auth = require('./server/module/Auth.js')
    const Config = require('./server/module/Config.js')
    const ParamSwitch = require('./server/module/ParamSwitch')
    const Http = require('./server/module/Http.js')
    const ResultModule = require('./server/util/result')

    const apiID = event.requestContext.apiId
    //通过apiID配置文件
    const config = await Config(apiID)
    //根据配置文件，调用对应的身份认证函数。得到authInfo
    const authInfo = await Auth.get(config.identityFunction, apiID)
    //根据配置对入参进行转化
    const thirdPartyEnterParams = await ParamSwitch.enter(
      event,
      config.enterParamMapping
    )
    //发起请求
    const thirdPartyResult = await Http(authInfo, thirdPartyEnterParams, config)
    //根据配置对入参进行转化
    const standardResult = await ParamSwitch.exit(
      thirdPartyResult,
      config.outParamMapping
    )
    console.log(standardResult)
    return ResultModule.success(standardResult)
  },
}

module.exports = Entrance
