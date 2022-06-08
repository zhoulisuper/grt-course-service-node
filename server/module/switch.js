const JSONPath = require('JSONPath')

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

const formulaSwitch = (relation, obj) => {
  //获取函数名
  let function_name = relation.match(/fun_(\S*)\(/)[1]
  let formulaFUN = JSON.parse(this.formulaList[function_name])

  //获取函数声明参数
  let function_arguments = formulaFUN.match(/\((\S*)\)/)[1]
  //获取函数声明体
  let function_body = formulaFUN.match(/\{((.|\n|\r)+?)\}/)[1]
  //定义函数
  global[function_name] = new Function(function_arguments, function_body)
  //获取函数执行参数
  let argsRelation = relation.match(/\((\S*)\)/)[1].split(',') //$.name,$.doms.name
  let args = []
  argsRelation.forEach((item, index) => {
    if (item.match(/^\$.*/)) {
      args[index] = jsonSwitch(item, obj)
    } else {
      args[index] = item
    }
  })
  return global[function_name](...args)
}

const getResult = async (obj, mapRelation) => {
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
  console.log(result)
  return result
}

module.exports = {
  formulaList: null, //公式列表
  getResult,
  formulaSwitch,
}
