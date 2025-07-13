import cron from "node-cron";
import redis, { userKey } from "../config/redis.js";
import Book from "../models/book.model.js";

cron.schedule("*/2 * * * *", async () => {
  try {
    console.log("[CRON] Bulk book insert started");
    const stream = redis.scanStream({ match: "u:*:bulkBooks" });
    for await (const keys of stream) {
      await Promise.all(
        keys.map(async (k) => {
          const userId = k.split(":")[1];
          const items = await redis.lrange(k, 0, -1);
          if (!items.length) return;
          const docs = items
            .flatMap((str) => JSON.parse(str))
            .map((book) => ({ ...book, owner: userId }));
          await Book.insertMany(docs);
          await redis.del(k);
          await redis.del(userKey(userId, "books"));
        })
      );
    }
    console.log("[CRON] Bulk book insert finished");
  } catch (err) {
    console.error("[CRON] Error:", err.message);
  }
});
