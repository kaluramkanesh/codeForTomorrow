import { Redis } from "ioredis";
export const redis = new Redis(process.env.REDIS_URL!);
export async function cacheSet(key: string, value: any, ttl: 300) {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}
export async function cacheGet<T>(key: string) {
  const data = await redis.get(key);
  return data ? (JSON.parse(data) as T) : null;
}
