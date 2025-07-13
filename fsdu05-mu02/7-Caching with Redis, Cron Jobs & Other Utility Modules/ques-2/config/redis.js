import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Helper: generate user‑scoped keys
export const userKey=(userId,suffix)=>`u:${userId}:${suffix}`;

export default redis;
