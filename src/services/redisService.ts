import redis from '../config/redis';

export async function setCache(key: string, value: any, expirationInSeconds: number = 3600) {
    await redis.set(key, JSON.stringify(value), 'EX', expirationInSeconds);
}

export async function getCache<T = any>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null
    
}

export async function deleteCache(key: string) {
    await redis.del(key);
}