/*
 * @Description: 默认服务配置，预生产环境
 * @Author: 周丽
 * @Date: 2022-5-20
 */
module.exports = {
  redis: {
    sentinels: [
      { host: '10.0.0.244', port: 26380 },
      { host: '10.0.0.246', port: 26380 },
      { host: '10.0.0.252', port: 26380 },
    ],
    family: 4,
    name: 'ttcdwmaster',
    db: 0,
    password: 'redis123',
  },
}
