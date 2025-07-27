// 1. Define an abstraction
interface Database {
    save(data: string): void;
}


class MySQLService implements Database {
    public save(data: string): void {
        console.log("Saving to MySQL:", data);
    }
}


class MongoDBService implements Database {
    public save(data: string): void {
        console.log("Saving to MongoDB:", data);
    }
}


class UserService {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public register(user: string): void {
        this.db.save(user);
    }
}

const mysqlService = new MySQLService();
const userService = new UserService(mysqlService);
userService.register("Swapnil sweel");
const mongoService = new MongoDBService();
const userService2 = new UserService(mongoService);
userService2.register("Swapnil Vijay");
