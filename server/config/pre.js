/*
 * @Description: 默认服务配置，预生产环境
 * @Author: 周丽
 * @Date: 2022-5-20
 */
module.exports = {
  redis: {
    cluster: [
      { host: '11.0.0.24', port: 7379 },
      { host: '11.0.0.24', port: 7380 },
      { host: '11.0.0.24', port: 7381 },
    ],
    redisOptions: {
      name: 'mymaster',
      password: 'redis123',
    },
  },
}
