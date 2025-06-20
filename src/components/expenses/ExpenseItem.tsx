// src/components/expenses/ExpenseItem.tsx
import React from 'react';
import type { ExpenseDetail } from '../../index';

interface ExpenseItemProps {
  expense: ExpenseDetail;
  onDelete: (id: number) => void;
  isDeleting?: boolean; // Para mostrar estado de carga durante eliminación
}

// Función para formatear fecha de manera más legible
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString; // Fallback si la fecha no es válida
  }
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ 
  expense, 
  onDelete, 
  isDeleting = false 
}) => {
  const handleDelete = () => {
    if (!isDeleting) {
      onDelete(expense.id);
    }
  };

  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      padding: '15px',
      backgroundColor: isDeleting ? '#f8f9fa' : '#ffffff',
      marginBottom: '2px',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
      opacity: isDeleting ? 0.6 : 1,
      position: 'relative'
    }}>
      <div style={{ flex: 1 }}>
        {/* Mostrar categoría como título principal */}
        <div style={{
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#333',
          marginBottom: '4px'
        }}>
          {expense.category.name}
        </div>
        
        {/* Mostrar monto */}
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#28a745',
          marginBottom: '4px'
        }}>
          S/ {expense.amount.toFixed(2)}
        </div>
        
        {/* Mostrar fecha formateada */}
        <div style={{
          fontSize: '14px',
          color: '#6c757d'
        }}>
          {formatDate(expense.date)}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px' 
      }}>
        {/* ID para referencia (opcional, puedes quitarlo) */}
        <small style={{
          color: '#adb5bd',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          #{expense.id}
        </small>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            backgroundColor: isDeleting ? '#6c757d' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s ease',
            minWidth: '70px'
          }}
          onMouseOver={(e) => {
            if (!isDeleting) {
              e.currentTarget.style.backgroundColor = '#c82333';
            }
          }}
          onMouseOut={(e) => {
            if (!isDeleting) {
              e.currentTarget.style.backgroundColor = '#dc3545';
            }
          }}
        >
          {isDeleting ? '...' : 'Delete'}
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;