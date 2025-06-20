// src/pages/DashboardPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getExpensesSummary, getExpenseCategories } from '../services/expenses';
import type { ExpenseSummary, ExpenseCategory } from '../index';
import ExpenseSummaryCard from '../components/expenses/ExpenseSummaryCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<ExpenseSummary[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchSummaryAndCategories = async () => {
      try {
        const [summaryData, categoriesData] = await Promise.all([
          getExpensesSummary(), // Obtener resumen de gastos
          getExpenseCategories() // Obtener categorías de gastos
        ]);
        setSummary(summaryData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummaryAndCategories();
  }, []);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    // Navegar a la página de detalle con los parámetros de la categoría y fecha
    navigate(`/expenses/detail?year=${currentYear}&month=${currentMonth}&categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-12">Error: {error}</div>;
  }

  const summaryWithNames = summary.map(item => ({
    ...item,
    categoryName: categories.find(cat => cat.id === item.expenseCategory.id)?.name || 'Unknown Category'
  }));

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Monthly Expense Summary ({currentMonth}/{currentYear})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {summaryWithNames.length > 0 ? (
          summaryWithNames.map((item) => (
            <ExpenseSummaryCard
              key={item.expenseCategory.id}
              categoryName={item.expenseCategory.name}
              totalAmount={item.amount}
              onClick={() => handleCategoryClick(item.expenseCategory.id, item.categoryName)}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">No expenses recorded for this month yet.</p>
        )}
      </div>
      <div className="text-center">
        <Button onClick={() => navigate('/expenses/new')}>
          Register New Expense
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;