// src/components/expenses/ExpenseForm.tsx
import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import type { NewExpense } from '../../index';
// ExpenseCategory type defined locally because '../types' does not exist
export type ExpenseCategory = {
  id: number;
  name: string;
};
import LoadingSpinner from '../common/LoadingSpinner'; // Para el spinner de carga de categorías

interface ExpenseFormProps {
  initialData?: NewExpense; // Para edición (si se implementara)
  onSubmit: (expense: NewExpense) => void;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  error,
}) => {
  const [description, setDescription] = useState(initialData?.description || '');
  const [amount, setAmount] = useState<number | ''>(initialData?.amount || '');
  const [categoryId, setCategoryId] = useState<number | ''>(initialData?.categoryId || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);

  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const data = await getExpenseCategories();
        setCategories(data);
      } catch (err: any) {
        setCategoriesError(err.message || 'Failed to load categories.');
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (amount === '' || categoryId === '') {
    setCategoriesError('Please fill all fields.'); // O un error más específico
    return;
  }

  // Asegúrate de que amount y categoryId sean números
  const newExpense: NewExpense = {
    description,
    amount: typeof amount === 'string' ? parseFloat(amount) : amount,
    categoryId: typeof categoryId === 'string' ? parseInt(categoryId) : categoryId,
    date, // Asegúrate de que 'date' tenga el formato YYYY-MM-DD
  };
  onSubmit(newExpense);
};

  if (loadingCategories) {
    return <LoadingSpinner />; // Muestra spinner mientras carga categorías
  }

  if (categoriesError) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error loading categories: {categoriesError}</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <Input
        label="Description:"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        label="Amount (S/):"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
        step="0.01"
      />
      <div>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category:</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Date:"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Expense'}
      </Button>
      <Button type="button" onClick={onCancel} style={{ backgroundColor: '#6c757d' }}>
        Cancel
      </Button>
    </form>
  );
};

// Simulated async fetch for categories (replace with real API call as needed)
async function getExpenseCategories(): Promise<ExpenseCategory[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Example categories
    return [
        { id: 1, name: 'Food' },
        { id: 2, name: 'Transport' },
        { id: 3, name: 'Utilities' },
        { id: 4, name: 'Entertainment' },
        { id: 5, name: 'Other' },
    ];
}

export default ExpenseForm;
