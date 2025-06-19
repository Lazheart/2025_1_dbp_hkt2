// src/types/index.ts

export interface User {
  email: string;
  token: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    token: string;
    email: string;
  };
}

export interface ExpenseSummary {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
}

export interface ExpenseDetail {
  id: string; // Asumiendo un ID de string para los gastos individuales
  categoryId: number;
  amount: number;
  description: string;
  date: string; // ISO format: YYYY-MM-DD
}

export interface ExpenseCategory {
  id: number;
  name: string;
}

export interface Goal {
  id: string; // Asumiendo un ID de string para las metas
  month: number;
  year: number;
  targetAmount: number;
  currentSaved: number; // Esto probablemente lo calcularías en el frontend
}

export interface NewExpense {
  categoryId: number;
  amount: number;
  description: string;
  date: string;
}

export interface NewGoal {
  month: number;
  year: number;
  targetAmount: number;
}