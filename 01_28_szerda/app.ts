console.log("Házi feladat");

interface IIdentifiable {
  getId(): string;
}

class Product implements IIdentifiable {
  private id: string;
  private name: string;
  private price: number;
  private description?: string;

  constructor(id: string, name: string, price: number, description?: string) {
    if (!id.trim()) throw new Error("A termék ID nem lehet üres.");
    if (!name.trim()) throw new Error("A termék név nem lehet üres.");
    if (price < 0) throw new Error("A termék ára nem lehet negatív.");

    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public toString(): string {
    const descPart = this.description ? ` — ${this.description}` : "";
    return `[${this.id}] ${this.name} (${this.price} Ft)${descPart}`;
  }
}

class Inventory {
  protected products: Product[] = [];

  public addProduct(product: Product): void {
    const alreadyExists = this.products.some(p => p.getId() === product.getId());
    if (alreadyExists) {
      throw new Error(`Már létezik termék ezzel az ID-val: ${product.getId()}`);
    }
    this.products.push(product);
  }

  public removeProductById(id: string): boolean {
    const originalLength = this.products.length;
    this.products = this.products.filter(p => p.getId() !== id);
    return this.products.length !== originalLength; 
  }

  public findProductById(id: string): Product | undefined {
    return this.products.find(p => p.getId() === id);
  }

  public findProductsByName(name: string): Product[] {
    const search = name.trim().toLowerCase();
    if (!search) return [];

    return this.products.filter(p =>
      p.getName().toLowerCase().includes(search)
    );
  }

  public listAllProducts(): Product[] {
    return [...this.products];
  }

 
  public areProductsAvailable(productIds: string[]): boolean {
    return productIds.every(id => this.findProductById(id) !== undefined);
  }

  public getProductsByIds(productIds: string[]): Product[] {
    return productIds.map(id => {
      const product = this.findProductById(id);
      if (!product) throw new Error(`Nincs ilyen termék a készletben: ${id}`);
      return product;
    });
  }
}

enum OrderStatus {
  New = "Új",
  Processing = "Feldolgozás alatt",
  Shipped = "Kiszállítva",
}

class Order implements IIdentifiable {
  private orderId: string;
  private products: Product[];
  private status: OrderStatus;

  constructor(orderId: string, products: Product[]) {
    if (!orderId.trim()) throw new Error("A rendelési ID nem lehet üres.");
    if (products.length === 0) throw new Error("A rendeléshez legalább 1 termék kell.");

    this.orderId = orderId;
    this.products = [...products]; 
    this.status = OrderStatus.New;
  }

  public getId(): string {
    return this.orderId;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public updateStatus(newStatus: OrderStatus): void {
    const orderFlow = [OrderStatus.New, OrderStatus.Processing, OrderStatus.Shipped];
    const currentIndex = orderFlow.indexOf(this.status);
    const newIndex = orderFlow.indexOf(newStatus);

    if (newIndex < currentIndex) {
      throw new Error(`Nem lehet visszalépni státuszban: ${this.status} -> ${newStatus}`);
    }

    this.status = newStatus;
  }

  public getTotal(): number {
    return this.products.reduce((sum, p) => sum + p.getPrice(), 0);
  }

  public summary(): string {
    const lines = this.products.map(p => `- ${p.toString()}`);
    return [
      `Rendelés: ${this.orderId}`,
      `Státusz: ${this.status}`,
      `Tételek:`,
      ...lines,
      `Összesen: ${this.getTotal()} Ft`,
    ].join("\n");
  }
}

class User implements IIdentifiable {
  private userId: string;
  private name: string;
  private email: string;

  private orders: Order[] = [];

  constructor(userId: string, name: string, email: string) {
    if (!userId.trim()) throw new Error("A felhasználói ID nem lehet üres.");
    if (!name.trim()) throw new Error("A név nem lehet üres.");
    if (!email.trim() || !email.includes("@")) throw new Error("Az email érvénytelen.");

    this.userId = userId;
    this.name = name;
    this.email = email;
  }

  public getId(): string {
    return this.userId;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public listOrders(): Order[] {
    return [...this.orders];
  }

  public placeOrder(
    inventory: Inventory,
    orderId: string,
    productIds: string[]
  ): Order {
    if (productIds.length === 0) {
      throw new Error("Nem lehet üres terméklistával rendelést leadni.");
    }

    const available = inventory.areProductsAvailable(productIds);
    if (!available) {
      throw new Error("A rendelésben szerepel olyan termék, ami nem elérhető a készletben.");
    }

    const products = inventory.getProductsByIds(productIds);
    const newOrder = new Order(orderId, products);

    this.orders.push(newOrder);
    return newOrder;
  }
}

const inventory = new Inventory();

const p1 = new Product("P-001", "Bögre", 1990, "Fehér kerámia bögre");
const p2 = new Product("P-002", "Póló", 4990, "Fekete, M-es");
const p3 = new Product("P-003", "Jegyzetfüzet", 1290);

inventory.addProduct(p1);
inventory.addProduct(p2);
inventory.addProduct(p3);

console.log("Készlet:");
inventory.listAllProducts().forEach(p => console.log(p.toString()));

console.log("\nKeresés 'pó' névre:");
inventory.findProductsByName("pó").forEach(p => console.log(p.toString()));

const user = new User("U-100", "Kőrös Anna", "anna@example.com");

const order = user.placeOrder(inventory, "O-9001", ["P-001", "P-003"]);
console.log("\nRendelés összegzés (új):");
console.log(order.summary());

order.updateStatus(OrderStatus.Processing);
order.updateStatus(OrderStatus.Shipped);

console.log("\nRendelés összegzés (kiszállítva):");
console.log(order.summary());
