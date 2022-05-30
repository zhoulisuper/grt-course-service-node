

let getConfig = async (identityCode) => {
    //通过identityCode 从redis 中得到config配置 
    return {
            //第三方服务地址
            "serviceUrl": "http://aaa.com/api",
            //第三方请求方式
            "serviceType": "get",
            //认证函数
            "identityFunction": "urn:fss:cn-north-4:d11b297285b647a69fdd7fb549146d15:function:default:getToken:latest",
            //入参映射关系
            "enterParams": {
                "newName": "$.user",
                "newDom": "$.courseId",
                "childeren": "$.content",
            },
            //出参映射关系
            "outParams": {
                "newName": "$.user",
                "newDom": "$.courseId",
                "childeren": "$.content",
            },
            //第三方商户返回数据格式
            "serviceOutParamsFormat": {
                "name": "xxx",
                "doms": {
                    "name": "www",
                    "child": []
                },
                "children": []
            },
    
        }
}

module.exports = {
    getConfig: getConfig,
};
