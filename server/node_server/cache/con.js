import redis from "redis";
import {promisify} from "util";

const cache =  redis.createClient(process.env.REDIS_URL);

export const addDataToCache = promisify(cache.set).bind(cache);
export const getDataFromCache = promisify(cache.get).bind(cache);
export const deleteDataFromCache = promisify(cache.del).bind(cache);
export const setExpirationTimeToCacheKey = promisify(cache.expire).bind(cache);

export default cache;