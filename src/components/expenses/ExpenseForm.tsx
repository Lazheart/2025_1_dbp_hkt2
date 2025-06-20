// src/components/expenses/ExpenseForm.tsx
import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { getExpenseCategories } from '../../services/expenses'; // Importar la función real
import type { NewExpense } from '../../index';

export type ExpenseCategory = {
  id: number;
  name: string;
};

interface ExpenseFormProps {
  initialData?: NewExpense & { id?: number }; // Para edición
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
  const [amount, setAmount] = useState<number | ''>(initialData?.amount || '');
  const [categoryId, setCategoryId] = useState<number | ''>(initialData?.category?.id || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);

  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setCategoriesError(null);
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
    
    // Validaciones
    if (!amount || !categoryId || !date) {
      return;
    }
    
    if (typeof amount !== 'number' || amount <= 0) {
      return;
    }

    // Crear el objeto NewExpense según la interfaz
    onSubmit({
      amount: amount as number,
      category: {
        id: categoryId as number
      },
      date,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAmount('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setAmount(numValue);
      }
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCategoryId('');
    } else {
      setCategoryId(parseInt(value));
    }
  };

  if (loadingCategories) {
    return <LoadingSpinner />;
  }

  if (categoriesError) {
    return (
      <div style={{ 
        color: 'red', 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '20px',
        border: '1px solid #ff6b6b',
        borderRadius: '8px',
        backgroundColor: '#ffe0e0'
      }}>
        Error loading categories: {categoriesError}
        <br />
        <Button 
          type="button" 
          onClick={() => window.location.reload()}
          style={{ marginTop: '10px', backgroundColor: '#007bff' }}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        maxWidth: '400px', 
        margin: '20px auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        {initialData ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <Input
        label="Amount (S/):"
        type="number"
        value={amount === '' ? '' : amount.toString()}
        onChange={handleAmountChange}
        required
        step="0.01"
        min="0.01"
        placeholder="0.00"
      />

      <div>
        <label 
          htmlFor="category" 
          style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Category: *
        </label>
        <select
          id="category"
          value={categoryId === '' ? '' : categoryId.toString()}
          onChange={handleCategoryChange}
          required
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            fontSize: '14px',
            backgroundColor: '#fff'
          }}
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
        max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
      />

      {error && (
        <div style={{ 
          color: '#dc3545', 
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button 
          type="submit" 
          disabled={isLoading || !amount || !categoryId || !date}
          style={{
            flex: 1,
            backgroundColor: isLoading ? '#6c757d' : '#28a745',
            opacity: (!amount || !categoryId || !date) ? 0.6 : 1
          }}
        >
          {isLoading ? 'Saving...' : (initialData ? 'Update Expense' : 'Save Expense')}
        </Button>
        
        <Button 
          type="button" 
          onClick={onCancel}
          disabled={isLoading}
          style={{ 
            flex: 1,
            backgroundColor: '#6c757d',
            opacity: isLoading ? 0.6 : 1
          }}
        >
          Cancel
        </Button>
      </div>

      {/* Preview section */}
      <div style={{
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>Preview:</h4>
        <div style={{ fontSize: '14px', color: '#6c757d' }}>
          <p style={{ margin: '5px 0' }}>
            <strong>Amount:</strong> S/ {amount || '0.00'}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Category:</strong> {
              categoryId ? categories.find(c => c.id === categoryId)?.name || 'Unknown' : 'Not selected'
            }
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Date:</strong> {date || 'Not selected'}
          </p>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;