interface Database {
  save(data: string): void;
}
class MySQLService implements Database {
  save(data: string): void {
    console.log("Saving to MySQL:", data);
  }
}
class MongoDBService implements Database {
  save(data: string): void {
    console.log("Saving to MongoDB:", data);
  }
}
class UserService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }
  register(user: string): void {
    this.db.save(user);
  }
}
const userServiceMySQL = new UserService(new MySQLService());
userServiceMySQL.register("swapnil");
const userServiceMongo = new UserService(new MongoDBService());
userServiceMongo.register("vijay");
