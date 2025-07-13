import redis, { userKey } from "../config/redis.js";

export const cacheBooks = async (req, res, next) => {
  const key = userKey(req.user._id, "books");
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));
  res.sendResponse = res.json;
  res.json = (body) => {
    redis.set(key, JSON.stringify(body), "EX", 60 * 5);
    res.sendResponse(body);
  };
  next();
};

export const invalidateBooks = (userId) => redis.del(userKey(userId, "books"));
