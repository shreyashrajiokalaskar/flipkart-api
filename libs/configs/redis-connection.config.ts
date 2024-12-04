import Redis from "ioredis";
import DOT_ENV from "../../config.env";

export class RedisConnection {
  public redis!: Redis;

  public async connectRedis() {
    try {
      if (!this.redis) {
        this.redis = new Redis({
          host: DOT_ENV.redisHost,
          port: +(DOT_ENV.redisPort ?? 6379),
        });
      }
      return this.redis;
    } catch (error) {
      throw error;
    }
  }
}

export const redisConnection = new RedisConnection();
