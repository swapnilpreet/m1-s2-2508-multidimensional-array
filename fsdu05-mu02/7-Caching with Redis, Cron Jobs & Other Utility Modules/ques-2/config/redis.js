import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export const userKey=(userId,suffix)=>`u:${userId}:${suffix}`;

export default redis;
