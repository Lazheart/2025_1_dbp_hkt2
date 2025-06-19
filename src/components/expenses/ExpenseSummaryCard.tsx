// src/components/expenses/ExpenseSummaryCard.tsx
import React from 'react';

interface ExpenseSummaryCardProps {
  categoryName: string;
  totalAmount: number;
  onClick: () => void;
}

const ExpenseSummaryCard: React.FC<ExpenseSummaryCardProps> = ({ categoryName, totalAmount, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        transition: 'transform 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <h3>{categoryName}</h3>
      <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#007bff' }}>S/ {totalAmount.toFixed(2)}</p>
      <small>Click for details</small>
    </div>
  );
};

export default ExpenseSummaryCard;