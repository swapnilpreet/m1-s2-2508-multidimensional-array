interface Product {
  name: string;
  price: number;
  getDescription(): string;
}


class Laptop implements Product {
  constructor(public name: string, public price: number) {}

  getDescription(): string {
    return `Laptop: ${this.name}, Price: $${this.price}`;
  }
}

class Mobile implements Product {
  constructor(public name: string, public price: number) {}

  getDescription(): string {
    return `Mobile: ${this.name}, Price: $${this.price}`;
  }
}

class Tablet implements Product {
  constructor(public name: string, public price: number) {}

  getDescription(): string {
    return `Tablet: ${this.name}, Price: $${this.price}`;
  }
}


type ProductConstructor = new (name: string, price: number) => Product;


const productMap: Record<string, ProductConstructor> = {
  Laptop: Laptop,
  Mobile: Mobile,
  Tablet: Tablet,
};


class ProductFactory {
  static createProduct(type: string, name: string, price: number): Product {
    const ProductClass = productMap[type];
    if (!ProductClass) {
      throw new Error(`Unknown product type: ${type}`);
    }
    return new ProductClass(name, price);
  }
}


const t = ProductFactory.createProduct("Tablet", "Galaxy Tab", 1100);
console.log(t.getDescription());