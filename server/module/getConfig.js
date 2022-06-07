module.exports = async (apiID) => {
  //apiID 从redis 中得到config配置
  let res = await global.redisClient.hgetall(apiID)
  return {
    enterParamMapping: JSON.parse(JSON.parse(res.enterParams)),
    outParamMapping: JSON.parse(JSON.parse(res.outParams)),
    identityFunction: JSON.parse(res.identityFunction),
    serviceHttpUrl: JSON.parse(res.serviceUrl),
    serviceHttpType: JSON.parse(res.serviceType).toLowerCase(),
  }
}
