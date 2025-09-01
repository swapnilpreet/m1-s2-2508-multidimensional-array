"use strict";
class MySQLService {
    save(data) {
        console.log("Saving to MySQL:", data);
    }
}
class MongoDBService {
    save(data) {
        console.log("Saving to MongoDB:", data);
    }
}
class UserService {
    constructor(db) {
        this.db = db;
    }
    register(user) {
        this.db.save(user);
    }
}
const userServiceMySQL = new UserService(new MySQLService());
userServiceMySQL.register("swapnil");
const userServiceMongo = new UserService(new MongoDBService());
userServiceMongo.register("vijay");
