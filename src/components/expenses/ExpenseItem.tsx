// src/components/expenses/ExpenseItem.tsx
import React from 'react';
import type { ExpenseDetail } from '../../types';

interface ExpenseItemProps {
  expense: ExpenseDetail;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      padding: '10px 0',
      backgroundColor: '#f9f9f9',
      marginBottom: '5px',
      borderRadius: '4px',
      paddingLeft: '15px',
      paddingRight: '15px',
    }}>
      <div>
        <strong>{expense.description}</strong> - S/ {expense.amount.toFixed(2)}
        <br />
        <small>Date: {expense.date}</small>
      </div>
      <button
        onClick={() => onDelete(expense.id)}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '0.8em'
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default ExpenseItem;