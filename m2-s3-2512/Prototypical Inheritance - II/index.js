// Q: 8
// Title
// Designing a Library System for Regular and Premium Members


class Book {
    constructor(title, author){
        this.title = title,
        this.author = author,
        this.isAvailable = true;
    }
}

class Member {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }
    borrowedBook(book,specialCollectionAccess) {
        if(this.borrowedBooks.length>= (specialCollectionAccess ? 5 : 3)){
            console.log(this.name,"book borrowed limit reached");
            return;
        }
        if(!book.isAvailable) {
            console.log(this.name,"book is already borrowed")
        }
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        console.log(this.name,this.borrowedBooks)
    }
}

class PremiumMember extends Member {
    constructor(name) {
        super(name);
        this.specialCollectionAccess=true;
    }
    borrowedBook(book) {
        if(this.borrowedBooks.length>=5){
            console.log(this.name, "borrowed book limit reached");
        }
        super.borrowedBook(book,this.specialCollectionAccess);
    }
}

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
const book2 = new Book("1984", "George Orwell");
const book3 = new Book("Moby Dick", "Herman Melville");
const book4 = new Book("Pride and Prejudice", "Jane Austen");
const book5 = new Book("War and Peace", "Leo Tolstoy");
const book6 = new Book("Ulysses", "James Joyce");

const regularMember = new Member("Alice");
const premiumMember = new PremiumMember("Bob");


regularMember.borrowedBook(book1);
regularMember.borrowedBook(book2);
regularMember.borrowedBook(book3);
regularMember.borrowedBook(book4); 

premiumMember.borrowedBook(book4);
premiumMember.borrowedBook(book5);
premiumMember.borrowedBook(book6);
premiumMember.borrowedBook(book1);
premiumMember.borrowedBook(book2);
premiumMember.borrowedBook(book3); 

 
const borrowForAlice = regularMember.borrowedBook.bind(regularMember, book5);
borrowForAlice();
