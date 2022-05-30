let getResult = async (params, mapRelation) => {
    const JSONPath = require('JSONPath');

    //公式列表
    let list = {
        add: "'function a (a,b){\n      let c = 1\n      return function (){\n            return c+1\n      }\n}'"
    }
    //配置定义
    // @mapRelation 
    // {
    //     name:"fun_add($.name,$.doms.name)"
    // }
    Object.keys(mapRelation).forEach((key) => {
        if (String(mapRelation[key]).match(/^fun_.*/)) {
            //获取函数名
            let function_name = mapRelation[key].match(/fun_(\S*)\(/)[1];//add
            //获取函数声明参数
            let function_arguments = list[function_name].match(/\((\S*)\)/)[1];//a,b
            //获取函数声明体
            let function_body = list[function_name].match(/\{(\S*)\}/)[1];//let c = 3 ; return a+b+c
            //定义函数
            window[function_name] = new Function(function_arguments, function_body)
            //获取函数执行参数
            let args = mapRelation[key].match(/\((\S*)\)/)[1];//$.name,$.doms.name
            //得到执行结果
            mapRelation[key] = window[function_name](...args)
        } else {
            JSONPath({
                path: mapRelation[key],
                json: params,
                callback: (value, ...arg) => {
                    mapRelation[key] = value;
                },
            });
        }
    })
    console.log(mapRelation)
    return mapRelation
}

module.exports = {
    getResult: getResult,
};
