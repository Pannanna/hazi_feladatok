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


class Library {
  books: Book[] = []; 

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(id: string): void {
    this.books = this.books.filter((book) => book.id !== id);
  }

  findBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  listAllBooks(): Book[] {
    return this.books;
  }
}


class User {
  userId: string;
  name: string;
  email: string;

  constructor(userId: string, name: string, email: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }

  borrowBook(library: Library, bookId: string): void {
    const book = library.findBookById(bookId);

    if (book) {
      library.removeBook(bookId);
      console.log(`${this.name} kikölcsönözte: "${book.title}"`);
    } else {
      console.log("Nincs ilyen könyv a könyvtárban!");
    }
  }
}


