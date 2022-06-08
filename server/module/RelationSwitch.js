/*
 * @Description: 出入参数转换模块
 * @Author: 周丽
 * @Date: 2022-6-7
 */

const JSONPath = require('JSONPath')
/**
 *
 * @param {*} relation 复杂映射中定义jsonpath路径 $.xxxxx
 * @param {*} obj 要解析的对象
 * @returns
 */
const jsonSwitch = (relation, obj) => {
  let res = null
  JSONPath({
    json: obj,
    path: relation,
    callback: (value) => {
      res = value
    },
  })
  return res
}
/**
 *
 * @param {*} relation  复杂映射中定义函数使用 fun_xxxxx
 * @param {*} obj 要解析的对象
 * @returns
 */

const formulaSwitch = (relation, obj) => {
  try {
    let function_name = relation.match(/fun_(\S*)\(/)[1]
    let formulaFUN = JSON.parse(this.formulaList[function_name])
    let function_arguments = formulaFUN.match(/\((\S*)\)/)[1]
    let function_body = formulaFUN.match(/(?<=\{)(.|\n|\r)*(?=\})/)[0]
    global[function_name] = new Function(function_arguments, function_body)
    let argsRelation = relation.match(/\((\S*)\)/)[1].split(',')
    let args = []
    argsRelation.forEach((item, index) => {
      if (item.match(/^\$.*/)) {
        args[index] = jsonSwitch(item, obj)
      } else {
        args[index] = item
      }
    })
    return global[function_name](...args)
  } catch (err) {
    return '自定义函数解析异常'
  }
}
/**
 *
 * @param {*} obj 要解析的对象
 * @param {*} mapRelation 复杂映射中定义 出入参映射关系map
 * @returns
 */
const get = async (obj, mapRelation) => {
  this.formulaList = await global.redisClient.hgetall('formulalist')
  let result = {}
  Object.keys(mapRelation).forEach((key) => {
    if (String(mapRelation[key]).match(/^fun_.*/)) {
      //匹配fun_
      result[key] = formulaSwitch(mapRelation[key], obj)
    } else if (String(mapRelation[key]).match(/^\$.*/)) {
      //匹配$.
      result[key] = jsonSwitch(mapRelation[key], obj)
    } else {
      result[key] = mapRelation[key]
    }
  })
  return result
}

module.exports = {
  formulaList: null,
  formulaSwitch,
  get,
}
