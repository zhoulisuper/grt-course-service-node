

let getTokenFromThird = async (identityFunction) => {
    const core = require('@huaweicloud/huaweicloud-sdk-core');
    const functiongraph = require("@huaweicloud/huaweicloud-sdk-functiongraph");

    const ak = "11E1LOKXCBPLMQNGFWZP";
    const sk = "IzheluIBfJOjU07XGtjLBASdxjsP2lydK7JpjJim";
    const endpoint = "https://functiongraph.cn-north-4.myhuaweicloud.com";
    const project_id = "d11b297285b647a69fdd7fb549146d15";

    const credentials = new core.BasicCredentials()
        .withAk(ak)
        .withSk(sk)
        .withProjectId(project_id)
    const client = functiongraph.FunctionGraphClient.newBuilder()
        .withCredential(credentials)
        .withEndpoint(endpoint)
        .build();
    const request = new functiongraph.InvokeFunctionRequest();
    request.functionUrn = identityFunction;
    request.body = {};
    const result = client.invokeFunction(request);
    let res = await result
    //将res 放到redis中，设置过期时间为15分钟
}

// redis
//key: @apiServiceToken
// {
// 'kechengyun':'ysuyfshfjw889w9ew5e656278902y3tegh',
// "aikecheng" : "dkfkdjfksdjfksjeurwoeuroeorwepwpeor",
// }

let getToken = async (event, context, identityFunction) => {
    //从redis中取token，key为identityFunction   如取不到，则重新调用getTokenFromThird接口 然后再从redis中取 
    await getTokenFromThird(identityFunction)
    let token = ''
    return token
}

module.exports = {
    getToken: getToken,
};
