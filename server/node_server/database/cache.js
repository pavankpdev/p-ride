import redis from "redis";
import {promisify} from "util";

const cache =  redis.createClient(process.env.REDIS_URL);

export const addDataToCache = async (key, value) => await cache.set(key, value);
export const getDataFromCache =  async (key) => await cache.get(key);
export const deleteDataFromCache =  async (key) => await cache.del(key);
export const setExpirationTimeToCacheKey =  async (key, ms) => await cache.expireAt(key, ms);

export default cache;