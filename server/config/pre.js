/*
 * @Description: pre环境配置
 * @Author: 周丽
 * @Date: 2022-6-7
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
