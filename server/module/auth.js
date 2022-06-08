const getTokenFromThird = async (funUrn, apiID) => {
  const core = require('@huaweicloud/huaweicloud-sdk-core')
  const functiongraph = require('@huaweicloud/huaweicloud-sdk-functiongraph')

  const ak = '2GGZ7Y2LKYLCLSGSSPUC'
  const sk = 'sbyUeO9JSdQhJGSUGI9kTiAFOUJOdAYU5sbq0eee'
  const endpoint = 'https://functiongraph.cn-north-4.myhuaweicloud.com'
  const project_id = '0e280f3aa900f5d12f7ac01cefbddf0f'

  const credentials = new core.BasicCredentials()
    .withAk(ak)
    .withSk(sk)
    .withProjectId(project_id)
  const client = functiongraph.FunctionGraphClient.newBuilder()
    .withCredential(credentials)
    .withEndpoint(endpoint)
    .build()
  const request = new functiongraph.InvokeFunctionRequest()
  request.functionUrn = funUrn
  request.body = {}
  let res = await client.invokeFunction(request)
  if (res.success) {
    global.redisClient.set(`${apiID}_token`, JSON.stringify(res.data))
    global.redisClient.expire(`${apiID}_token`, 15 * 60)
    return res.data
  }
  return '鉴权函数调用失败'
}

module.exports = {
  getAuth: async (funUrn, apiID) => {
    let authInfo = await global.redisClient.get(`${apiID}_token`)
    if (!authInfo) {
      return await getTokenFromThird(funUrn, apiID)
    }
    return JSON.parse(authInfo)
  },
}
