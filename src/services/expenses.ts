// src/services/expenses.ts
import api from './api';
import type { ExpenseSummary, ExpenseDetail, ExpenseCategory, NewExpense } from '../types';

export const getExpensesSummary = async (): Promise<ExpenseSummary[]> => {
  try {
    const response = await api.get<ExpenseSummary[]>('/expenses_summary');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching expense summary');
  }
};

export const getExpenseDetail = async (year: number, month: number, categoryId: number): Promise<ExpenseDetail[]> => {
  try {
    const response = await api.get<ExpenseDetail[]>(`/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching expense details');
  }
};

export const addExpense = async (expense: NewExpense): Promise<any> => {
  try {
    const response = await api.post('/expenses', expense);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error adding expense');
  }
};

export const deleteExpense = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting expense');
  }
};
  
export const getExpenseCategories = async (): Promise<ExpenseCategory[]> => {
  try {
    const response = await api.get<ExpenseCategory[]>('/expenses_category');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching expense categories');
  }
};