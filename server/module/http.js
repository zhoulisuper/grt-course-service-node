/*
 * @Description: http请求服务
 * @Author: 周丽
 * @Date: 2022-6-7
 */
const request = require('../util/request')
module.exports = async (authInfo, thirdPartyEnterParams, config) => {
  let param = Object.assign({}, { ...thirdPartyEnterParams }, { ...authInfo })
  return await request[config.serviceHttpType](config.serviceHttpUrl, param)
}
