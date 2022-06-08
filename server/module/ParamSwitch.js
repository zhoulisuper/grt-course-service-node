const RelationSwitch = require('./RelationSwitch')
const Base64 = require('js-base64')
/**
 *
 * @param {*} event api event 对象
 * @returns
 */
function getParams(event) {
  let body = (event.body && Base64.decode(event.body)) || {}
  try {
    body = JSON.parse(body)
  } catch (err) {
    return '参数解析异常'
  }
  return body
}
/**
 *
 * @param {*} event api event 对象
 * @param {*} relation 映射关系
 * @returns
 */
const enter = async (event, relation) => {
  const enterParams = getParams(event)
  return await RelationSwitch.get(enterParams, relation)
}
/**
 *
 * @param {*} thirdPartyResult 第三方接口返回值
 * @param {*} relation 映射关系
 * @returns
 */
const exit = async (thirdPartyResult, relation) => {
  const thirdPartyResultJson = JSON.parse(thirdPartyResult)
  //第三方接口成功失败标识
  //   if (!thirdPartyResultJson.success) {
  //
  //   }
  const standardResult = await RelationSwitch.get(
    thirdPartyResultJson,
    relation
  )
  return standardResult
}

module.exports = {
  enter,
  exit,
}
