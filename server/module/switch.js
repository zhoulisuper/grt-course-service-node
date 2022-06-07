const JSONPath = require('JSONPath')

const jsonSwitch = (relation, obj) => {
  JSONPath({
    path: relation,
    json: obj,
    callback: (value, ...arg) => {
      return value
    },
  })
}

const formulaSwitch = async (relation, obj) => {
  console.log(relation, obj)
  const formulaList = await global.redisClient.hgetall('formulalist')
  //获取函数名
  let function_name = relation.match(/fun_(\S*)\(/)[1] //add
  console.log(function_name)
  // let formulaFUN = formulaList[function_name].replace(/\\n/g, '')
  let formulaFUN = JSON.parse(formulaList[function_name])
  // let formulaFUN = formulaList[function_name]

  console.log(formulaFUN)
  //获取函数声明参数
  let function_arguments = formulaFUN.match(/\((\S*)\)/)[1] //a,b
  console.log(function_arguments)
  //获取函数声明体

  let function_body = String(formulaFUN).match(/\{((.|\n|\r)+?)\}/)[1] //let c = 3 ; return a+b+c
  console.log(function_body)
  //定义函数
  var getStatus = new Function(function_arguments, function_body)
  console.log(getStatus)
  //获取函数执行参数
  // let argsRelation = relation.match(/\((\S*)\)/)[1].split(',') //$.name,$.doms.name
  // console.log(argsRelation)
  // let args = []
  // argsRelation.forEach((item, index) => {
  //   if (String(item).match(/^\$.*/)) {
  //     args[index] = jsonSwitch(item, obj)
  //   } else {
  //     args[index] = item
  //   }
  // })
  // console.log(args)
  // //得到执行结果
  // return window[function_name](...args)
}

const getResult = async (obj, mapRelation) => {
  //公式列表
  let result = {}
  Object.keys(mapRelation).forEach((key) => {
    if (String(mapRelation[key]).match(/^fun_.*/)) {
      console.log(key)
      result[key] = formulaSwitch(mapRelation[key], obj)
    } else if (String(mapRelation[key]).match(/^\$.*/)) {
      result[key] = jsonSwitch(mapRelation[key], obj)
    } else {
      result[key] = mapRelation[key]
    }
  })
  return result
}

module.exports = {
  getResult,
}
