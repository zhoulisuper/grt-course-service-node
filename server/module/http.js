/*
 * @Description: http请求服务
 * @Author: 周丽
 * @Date: 2022-6-7
 */
/**
 *
 * @param {*} authInfo 授权信息
 * @param {*} thirdPartyEnterParams 解析后的第三方参数体
 * @param {*} config 复杂映射配置
 * @returns
 */
module.exports = async (authInfo, thirdPartyEnterParams, config) => {
  try {
    const request = require('../util/request')
    let param = Object.assign({}, { ...thirdPartyEnterParams }, { ...authInfo })
    return await request[config.serviceHttpType](config.serviceHttpUrl, param)
  } catch (err) {
    return '请求第三方接口异常'
  }
}
