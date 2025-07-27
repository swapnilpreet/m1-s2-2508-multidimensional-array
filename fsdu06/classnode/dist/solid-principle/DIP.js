"use strict";
// bad High level modules depends on low level-modules
// bad exmple
class MongoDB {
    save(data) {
        console.log(`Saving Data ${data} my MONGODB Database`);
    }
}
class UserService {
    constructor() {
        this.db = new MongoDB(); //tight coupling
    }
    addUser(user) {
        this.db.save(user);
    }
}
const newuserService = new UserService();
newuserService.addUser("swapnil");
class mySqulDatabase {
    save(data) {
        console.log(`saving ${data} to MongoDB`);
    }
}
class MongoDatabase {
    save(data) {
        console.log(`seving ${data} to MongoDB`);
    }
}
class userService {
    constructor(db) {
        this.db = db;
    }
    AddUser(user) {
        this.db.save(user);
    }
}
const MySqulDb = new mySqulDatabase();
const mongoDB = new MongoDatabase();
const userService1 = new userService(MySqulDb);
userService1.AddUser("sapnil");
const userService2 = new userService(mongoDB);
userService2.AddUser("Bob");
