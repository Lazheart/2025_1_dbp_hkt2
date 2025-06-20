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
      username: string;
    };
  }
  
  export interface ExpenseSummary {
    id: number
    expenseCategory: {
      id: number;
      name: string,
    };
    year: number;
    month: number;
    amount: number;
  }
  
  export interface ExpenseDetail {
    id: number;
    date: string;
    category: {
      id: number;
      name: string;
    };
    amount: number;
  }
  
  export interface ExpenseCategory {
    id: number;
    name: string;
  }

export interface NewExpense {
  amount: number;
  category:{
    id: number;
  }
  date: string;
}

