console.log("Házi feladat");

class Book {
  id: string;
  title: string;
  author: string;
  price: number;

  constructor(id: string, title: string, author: string, price: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
  }
}
