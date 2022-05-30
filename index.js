
let identityModule = require('./module/auth.js');
let configModule = require('./module/getConfig.js');
let switchMoudle = require('./module/switch.js');
let httpMoudle = require('./module/http.js');

exports.handler = async (event, context, callback) => {
    //第一步，对api进行区分，为课程云还是爱课云。。。
    let identityCode = event.path;
    //第二步，拿到商户标识，请求redis中的配置文件
    const config = await configModule.getConfig(identityCode)
    let identityFunction = config.identityFunction;
    //根据配置文件，调用对应的身份认证函数。得到token
    const token = await identityModule.getToken(event, context, identityFunction);
    //根据配置对入参进行转化
    let params = await switchMoudle.getResult(event.pathParameters, config.enterParams)
    //拿到token和参数，发起请求
    let outParams = await httpMoudle.request(token, params)
    //根据配置对出参进行转化
    let outData = await switchMoudle.getResult(outParams, config.outParams)
    //返回标准数据给业务方
    callback(null, token)
}
