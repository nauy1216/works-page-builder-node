import redis from 'redis'

const REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
  password: '123456',
}

// 创建客户端
const redisClient = redis.createClient({
  host: REDIS_CONF.host,
  port: REDIS_CONF.port,
  password: REDIS_CONF.password,
})

/* eslint-disable */
redisClient.on('error', err => {
  console.log('Redis err')
  console.log(err)
})

function set(key: string, val: any, timeout?: number) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  if (timeout) {
    redisClient.expire(key, timeout)
  }
}

function get(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

function zadd(setName: string, val: any, score = 1) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.zadd(setName, score, val)
}

function hmset(setName: string, key: string, val: any) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.hmset(setName, key, val)
}

function hmget(setName: string, key: string) {
  return new Promise((resolve, reject) => {
    redisClient.hmget(setName, key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      const list = val.map(item => {
        try {
          return JSON.parse(item)
        } catch (ex) {
          return item
        }
      })
      resolve(list)
    })
  })
}

function hvals(setName: string) {
  return new Promise((resolve, reject) => {
    redisClient.hvals(setName, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      const list = val.map(item => {
        try {
          return JSON.parse(item)
        } catch (ex) {
          return item
        }
      })
      resolve(list)
    })
  })
}

export default {
  set,
  get,
  zadd,
  hmset,
  hmget,
  hvals,
}
