console.log("Házi feladat");
var Book = /** @class */ (function () {
    function Book(id, title, author, price) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
    }
    Object.defineProperty(Book.prototype, "setId", {
        set: function () {
            this.id = id;
        },
        enumerable: false,
        configurable: true
    });
    return Book;
}());
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.removeBook = function (id) {
        this.books = this.books.filter(function (book) { return book.id !== id; });
    };
    Library.prototype.findBookById = function (id) {
        return this.books.find(function (book) { return book.id === id; });
    };
    Library.prototype.listAllBooks = function () {
        return this.books;
    };
    return Library;
}());
var User = /** @class */ (function () {
    function User(userId, name, email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
    User.prototype.borrowBook = function (library, bookId) {
        var book = library.findBookById(bookId);
        if (book) {
            library.removeBook(bookId);
            console.log("".concat(this.name, " kik\u00F6lcs\u00F6n\u00F6zte: \"").concat(book.title, "\""));
        }
        else {
            console.log("Nincs ilyen könyv a könyvtárban!");
        }
    };
    return User;
}());
