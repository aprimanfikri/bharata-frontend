declare global {
  interface Session {
    id?: string;
    username?: string;
    role?: string;
    token?: string;
    isLoggedIn: boolean;
  }

  enum TransactionType {
    IN = "IN",
    OUT = "OUT",
  }

  enum UserRole {
    ADMIN = "ADMIN",
    OPERATOR = "OPERATOR",
  }

  interface Rack {
    id: string;
    name: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface Product {
    id: string;
    name: string;
    code: string;
    stock: number;
    rackId: string;
    rack: Rack;
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface Transaction {
    id: string;
    productId: string;
    date: Date;
    type: TransactionType;
    amount: number;
    userId: string;
    product: Product;
    user: User;
    createdAt: Date;
    updatedAt: Date;
  }

  interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    role: UserRole;
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
  }
}

export {};
