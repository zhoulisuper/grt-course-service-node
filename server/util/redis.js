/*
 * @Description: redis 配置模块
 * @Author: 周丽
 * @Date: 2022-6-7
 */
const Redis = require('ioredis')
const path = require('path')
/**
 *
 * @param {*} context 函数计算的context 对象
 */

const init = async function (context) {
  console.log('init')
  let filename = context.getUserData('env') || 'default'
  global.rootServPath = path.resolve(__dirname, '../../server')
  global.appConfig = require(path.join(global.rootServPath, 'config', filename))
  let redis
  if (global.appConfig.redis && global.appConfig.redis.cluster) {
    // 集群模式
    let redisOptions = global.appConfig.redis.redisOptions || {}
    redis = new Redis.Cluster(global.appConfig.redis.cluster, { redisOptions })
  } else {
    // 哨兵模式或单点
    redis = new Redis(global.appConfig.redis)
  }
  global.redisClient = redis
}

module.exports = {
  install: init,
}
