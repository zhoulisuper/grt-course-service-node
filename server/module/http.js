const request = require('../util/request')

module.exports = async (token, thirdPartyEnterParams, config) => {
  let param = Object.assign({}, { ...thirdPartyEnterParams }, { _token: token })
  let res = await request[config.serviceHttpType](config.serviceHttpUrl, param)
  return res
}
