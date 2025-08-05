interface Book {
  title: string;
  price: number;
  getCategory(): string;
}

class RegularBook implements Book {
  title: string;
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  getCategory(): string {
    return "Regular Book";
  }
}

class PremiumBook implements Book {
  title: string;
  price: number;
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
  getCategory(): string {
    return "Premium Book";
  }
}

class BookFactory {
  static createBook(title: string, price: number): Book {
    if (price > 1000) {
      return new PremiumBook(title, price);
    } else {
      return new RegularBook(title, price);
    }
  }
}

const b1 = BookFactory.createBook("Design Patterns", 1500);
console.log(b1.getCategory());
const b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory());
