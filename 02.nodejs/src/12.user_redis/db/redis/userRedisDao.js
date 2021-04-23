const Redis = require('ioredis');

const redisKeyPrefix = 'myRedis::info::user:';

class UserRedisDao {
  getRedisConnection() {
    return new Redis({
      host: 'localhost',
      port: 6379
    });
  }


  async storeUserId(userSessionId, userId) {
    const redis = this.getRedisConnection();
    redis.set(redisKeyPrefix + userSessionId, userId, 'ex', 1800, (err, result) => {
      redis.quit();
    });
  }

  async getUserIdFromUserSessionByUserSessionId(userSessionId) {
    const redis = this.getRedisConnection();
    return redis.get(redisKeyPrefix + userSessionId, (err, userId) => {
      redis.quit();
      return userId;
    });
  }

  /**
   * 重置用户 Session 的过期时间
   * @param userSessionId
   * @returns {Promise<void>}
   */
  async resetUserSessionExpirationTime(userSessionId) {
    const redis = this.getRedisConnection();
    redis.expire(redisKeyPrefix + userSessionId, 1800, (err, result) => {
      redis.quit();
    });
  }

  /**
   * 当用户登出，移除存储的用户 Session
   * @param userSessionId
   * @returns {Promise<void>}
   */
  async removeUserSessionByUserSessionId(userSessionId) {
    const redis = this.getRedisConnection();
    redis.del(redisKeyPrefix + userSessionId, (err, result) => {
      redis.quit();
    });
  }
}

module.exports = new UserRedisDao();