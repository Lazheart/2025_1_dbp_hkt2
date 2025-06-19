// src/pages/GoalsPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { getGoals, addGoal, updateGoal } from '../services/goals';
import type { Goal, NewGoal } from '../types';

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newGoalMonth, setNewGoalMonth] = useState(new Date().getMonth() + 1);
  const [newGoalYear, setNewGoalYear] = useState(new Date().getFullYear());
  const [newGoalAmount, setNewGoalAmount] = useState<number | ''>('');
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingGoalAmount, setEditingGoalAmount] = useState<number | ''>('');


  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch goals.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newGoalAmount || newGoalAmount <= 0) {
      setError('Please enter a valid positive amount for the goal.');
      return;
    }

    const goalToAdd: NewGoal = {
      month: newGoalMonth,
      year: newGoalYear,
      targetAmount: newGoalAmount as number,
    };

    setIsLoading(true);
    try {
      const addedGoal = await addGoal(goalToAdd);
      setGoals([...goals, addedGoal]);
      setNewGoalAmount('');
      alert('Goal added successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to add goal.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGoal = async (goalId: string) => {
    setError(null);
    if (!editingGoalAmount || editingGoalAmount <= 0) {
      setError('Please enter a valid positive amount for the goal.');
      return;
    }

    setIsLoading(true);
    try {
      const updated = await updateGoal(goalId, { targetAmount: editingGoalAmount as number });
      setGoals(goals.map(goal => (goal.id === goalId ? updated : goal)));
      setEditingGoalId(null);
      setEditingGoalAmount('');
      alert('Goal updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update goal.');
    } finally {
      setIsLoading(false);
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
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Savings Goals</h1>

      <form onSubmit={handleAddGoal} className="flex flex-col gap-4 max-w-md mx-auto p-8 border border-gray-200 rounded-xl shadow-lg bg-white mb-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Set New Goal</h2>
        <Input
          label="Month:"
          type="number"
          value={newGoalMonth}
          onChange={(e) => setNewGoalMonth(parseInt(e.target.value))}
          min="1"
          max="12"
          required
        />
        <Input
          label="Year:"
          type="number"
          value={newGoalYear}
          onChange={(e) => setNewGoalYear(parseInt(e.target.value))}
          min="2020"
          required
        />
        <Input
          label="Target Amount (S/):"
          type="number"
          value={newGoalAmount}
          onChange={(e) => setNewGoalAmount(parseFloat(e.target.value))}
          step="0.01"
          required
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Goal'}
        </Button>
      </form>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Current Goals</h2>
        {goals.length === 0 ? (
          <p className="text-gray-600 text-center">No goals set yet.</p>
        ) : (
          <ul className="list-none p-0">
            {goals.map((goal) => (
              <li key={goal.id} className="flex justify-between items-center border border-gray-200 p-4 mb-4 rounded-lg shadow-sm bg-gray-50">
                <div>
                  <strong className="text-lg text-gray-800">{`${new Date(goal.year, goal.month - 1).toLocaleString('default', { month: 'long' })} ${goal.year}`}</strong>
                  <p className="text-gray-700">Target: S/ {goal.targetAmount.toFixed(2)}</p>
                </div>
                {editingGoalId === goal.id ? (
                  <div className="flex gap-3 items-center">
                    <Input
                      type="number"
                      value={editingGoalAmount}
                      onChange={(e) => setEditingGoalAmount(parseFloat(e.target.value))}
                      step="0.01"
                      className="w-28 text-sm"
                    />
                    <Button onClick={() => handleUpdateGoal(goal.id)} disabled={isLoading} className="text-sm px-3 py-1">Save</Button>
                    <Button onClick={() => { setEditingGoalId(null); setEditingGoalAmount(''); }} className="bg-gray-500 hover:bg-gray-600 text-sm px-3 py-1">Cancel</Button>
                  </div>
                ) : (
                  <Button onClick={() => { setEditingGoalId(goal.id); setEditingGoalAmount(goal.targetAmount); }} className="text-sm px-3 py-1">Edit</Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;