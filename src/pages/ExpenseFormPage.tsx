// src/pages/ExpenseFormPage.tsx
"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { addExpense } from '../services/expenses';
import type { NewExpense } from '../index';

const ExpenseFormPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleExpenseSubmit = async (newExpense: NewExpense) => {
    setIsLoading(true);
    setError(null);
    try {
      await addExpense(newExpense);
      alert('Expense registered successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register expense.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register New Expense</h1>
      <ExpenseForm
        onSubmit={handleExpenseSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ExpenseFormPage;