// src/types/index.ts

export interface User {
    email: string;
    token: string;
  }
  
  export interface AuthResponse {
      status: number;
    message: string;
    result: {
      token: string;
      email: string;
    };
  }
  
  export interface ExpenseSummary {
    categoryId: number;
    categoryName: string; // Esto se añadirá en el frontend al combinar con categories
    totalAmount: number;
  }
  
  export interface ExpenseDetail {
    id: string;
    categoryId: number;
    amount: number;
    description: string;
    date: string; // Formato ISO: YYYY-MM-DD
  }
  
  export interface ExpenseCategory {
    id: number;
    name: string;
  }

  export interface NewExpense {
    categoryId: number;
    amount: number;
    description: string;
    date: string;
  }
