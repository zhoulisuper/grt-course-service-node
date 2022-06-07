module.exports = {
  getConfig: async (apiID) => {
    //通过identityCode 从redis 中得到config配置
    let res = await global.redisClient.hgetall(apiID)
    return {
      enterParamMapping: JSON.parse(JSON.parse(res.enterParams)),
      outParamMapping: JSON.parse(JSON.parse(res.outParams)),
      identityFunction: res.identityFunction,
      serviceHttpUrl: res.serviceUrl,
      serviceHttpType: res.serviceType,
    }
  },
}
