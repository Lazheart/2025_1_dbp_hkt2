// src/services/goals.ts
import api from './api';
import type { Goal } from '../types';
import type { NewGoal } from '../types';

export const getGoals = async (): Promise<Goal[]> => {
  try {
    const response = await api.get<Goal[]>('/goals');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching goals');
  }
};

export const addGoal = async (goal: NewGoal): Promise<Goal> => {
  try {
    const response = await api.post<Goal>('/goals', goal);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error adding goal');
  }
};

export const updateGoal = async (id: string, goal: Partial<NewGoal>): Promise<Goal> => {
  try {
    const response = await api.patch<Goal>(`/goals/${id}`, goal);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error updating goal');
  }
};