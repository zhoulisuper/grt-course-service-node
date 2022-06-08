/*
 * @Description: 获取复杂映射配置
 * @Author: 周丽
 * @Date: 2022-6-7
 */
/**
 *
 * @param {*} apiID  openApi的apiID
 * @returns
 */
module.exports = async (apiID) => {
  try {
    let res = await global.redisClient.hgetall(apiID)
    return {
      enterParamMapping: JSON.parse(JSON.parse(res.enterParams)),
      outParamMapping: JSON.parse(JSON.parse(res.outParams)),
      identityFunction: JSON.parse(res.identityFunction),
      serviceHttpUrl: JSON.parse(res.serviceUrl),
      serviceHttpType: JSON.parse(res.serviceType).toLowerCase(),
    }
  } catch (err) {
    return '获取复杂映射配置异常'
  }
}
