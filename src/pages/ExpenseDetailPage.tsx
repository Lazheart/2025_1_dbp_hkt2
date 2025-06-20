// src/pages/ExpenseDetailPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getExpenseDetail, deleteExpense } from '../services/expenses';
import type { ExpenseDetail } from '../index';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ExpenseItem from '../components/expenses/ExpenseItem';
import Button from '../components/common/Button';

const ExpenseDetailPage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const year = parseInt(queryParams.get('year') || new Date().getFullYear().toString());
  const month = parseInt(queryParams.get('month') || (new Date().getMonth() + 1).toString());
  const categoryId = parseInt(queryParams.get('categoryId') || '0');
  const categoryName = queryParams.get('categoryName') || 'Selected Category';

  useEffect(() => {
    if (categoryId && year && month) {
      const fetchDetails = async () => {
        try {
          setIsLoading(true);
          const data = await getExpenseDetail(year, month, categoryId);
          setExpenses(data);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch expense details.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    } else {
      setError('Invalid category or date parameters.');
      setIsLoading(false);
    }
  }, [year, month, categoryId]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== id));
        alert('Expense deleted successfully!');
      } catch (err: any) {
        setError(err.message || 'Failed to delete expense.');
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-12">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{categoryName} Expenses ({month}/{year})</h1>
      <Button onClick={() => navigate('/dashboard')} className="mb-6 bg-gray-500 hover:bg-gray-600">
        ← Back to Summary
      </Button>
      <div className="bg-white rounded-lg shadow-md p-6">
        {expenses.length > 0 ? (
          <ul className="list-none p-0">
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No detailed expenses found for this category and month.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetailPage;