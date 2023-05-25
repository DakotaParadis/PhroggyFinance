import React, { createContext, useState } from 'react';

// Create a new context
export const BudgetContext = createContext();

// Create a provider component
export const BudgetProvider = ({ children }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseLabels, setExpenseLabels] = useState([]);

  // Other methods and state variables can be added here

  // Wrap the children components with the provider
  return (
    <BudgetContext.Provider
      value={{
        income,
        setIncome,
        expenses,
        setExpenses,
        expenseLabels,
        setExpenseLabels,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
