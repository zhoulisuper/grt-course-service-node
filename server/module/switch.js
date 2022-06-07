let getResult = async (params, mapRelation) => {
  const JSONPath = require('JSONPath')
  //公式列表
  let formulaList = await global.redisClient.hgetall('formulalist')
  let result = {}
  Object.keys(mapRelation).forEach((key) => {
    if (String(mapRelation[key]).match(/^fun_.*/)) {
      //获取函数名
      let function_name = mapRelation[key].match(/fun_(\S*)\(/)[1] //add
      //获取函数声明参数
      let function_arguments = formulaList[function_name].match(/\((\S*)\)/)[1] //a,b
      //获取函数声明体
      let function_body = formulaList[function_name].match(/\{(\S*)\}/)[1] //let c = 3 ; return a+b+c
      //定义函数
      window[function_name] = new Function(function_arguments, function_body)
      //获取函数执行参数
      let args = mapRelation[key].match(/\((\S*)\)/)[1] //$.name,$.doms.name
      //得到执行结果
      result[key] = window[function_name](...args)
    } else {
      JSONPath({
        path: mapRelation[key],
        json: params,
        callback: (value, ...arg) => {
          result[key] = value
        },
      })
    }
  })
  console.log(result)
  return result
}

module.exports = {
  getResult: getResult,
}
