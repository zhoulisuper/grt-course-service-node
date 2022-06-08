const request = require('../util/request')

module.exports = async (authInfo, thirdPartyEnterParams, config) => {
  let param = Object.assign({}, { ...thirdPartyEnterParams }, { ...authInfo })
  let res = await request[config.serviceHttpType](config.serviceHttpUrl, param)
  console.log('========> http')
  return res
}
