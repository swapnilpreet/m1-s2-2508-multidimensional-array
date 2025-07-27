

// bad High level modules depends on low level-modules
// bad exmple


class MongoDB{
    save(data:string):void{
        console.log(`Saving Data ${data} my MONGODB Database`);
    }
}

class UserService{
    private db:MongoDB;
    constructor(){
        this.db=new MongoDB(); //tight coupling
    }
    addUser(user:string):void{
        this.db.save(user);
    }
}


const newuserService=new UserService();

newuserService.addUser("swapnil")

// Problem:

// UserService (high-level) depends directly on MongoDB (low-level).

// If we want MongoDB, we must change UserService.



// Good example

interface IDataBase{
    
    save(data:string):void;

}

class mySqulDatabase implements IDataBase{
    save(data:string):void{
        console.log(`saving ${data} to MongoDB`);
        
    }
}

class MongoDatabase implements IDataBase{
    save(data:string):void{
        console.log(`seving ${data} to MongoDB`);
    }
}

class userService {
    private db:IDataBase;

    constructor(db:IDataBase){
        this.db=db;
    }

    AddUser(user:string):void{
        this.db.save(user);
    }
}


const MySqulDb=new mySqulDatabase();
const mongoDB=new MongoDatabase();

const userService1= new userService(MySqulDb)
userService1.AddUser("sapnil")

const userService2 = new userService(mongoDB);
userService2.AddUser("Bob");