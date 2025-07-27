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
const mysqlService = new MySQLService();
const userService = new UserService(mysqlService);
userService.register("Swapnil sweel");
const mongoService = new MongoDBService();
const userService2 = new UserService(mongoService);
userService2.register("Swapnil Vijay");
