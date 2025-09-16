import Redis from "ioredis";

// You can customize this with env vars if needed
const redis = new Redis({
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT),
});

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err: Error) => console.error("Redis error:", err));

export { redis as redisClient };
