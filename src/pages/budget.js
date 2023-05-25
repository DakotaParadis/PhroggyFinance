import React, { useState } from 'react';
import Navigation from './/Navigation';
import { useTable } from 'react-table';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver';
import Papa from 'papaparse';

const BudgetPage = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseLabels, setExpenseLabels] = useState([]);
  const [data, setData] = useState([]);
  const [importedData, setImportedData] = useState([]);


  // Handle income change
  const handleIncomeChange = (e) => {
    setIncome(parseFloat(e.target.value));
  };

  // Handle expense label change
  const handleExpenseLabelChange = (e, index) => {
    const updatedExpenseLabels = [...expenseLabels];
    updatedExpenseLabels[index] = e.target.value;
    setExpenseLabels(updatedExpenseLabels);
  };

  // Handle expense change
  const handleExpenseChange = (e, index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = parseFloat(e.target.value);
    setExpenses(updatedExpenses);
  };

  // Handle adding a new expense
  const handleAddExpense = () => {
    setExpenses([...expenses, 0]);
    setExpenseLabels([...expenseLabels, '']);
  };

  // Handle removing an expense
  const handleRemoveExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);

    const updatedExpenseLabels = [...expenseLabels];
    updatedExpenseLabels.splice(index, 1);
    setExpenseLabels(updatedExpenseLabels);
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense, 0);

  // Calculate balance
  const balance = income - totalExpenses;

  // Prepare data for the table
  const tableData = expenses.map((expense, index) => ({
    label: expenseLabels[index],
    expense: expense.toFixed(2),
  }));

  // Prepare columns for the table
  const tableColumns = React.useMemo(
    () => [
      {
        Header: 'Expense',
        accessor: 'label',
      },
      {
        Header: 'Amount',
        accessor: 'expense',
      },
    ],
    []
  );

  // Create an instance of the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: tableColumns,
    data: tableData,
  });

  // Handle export to Excel
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const excelData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(excelData, 'expenses.xlsx');
  };
  

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Personal Finance App</h1>
        <Navigation />
      </header>

      <main>
        <section className="py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Budget Calculator</h1>

            <div className="mb-6">
              <label htmlFor="income" className="block text-lg font-medium mb-2">
                Income
              </label>
              <input
                type="number"
                id="income"
                value={income}
                onChange={handleIncomeChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Expenses</h2>
              {expenses.map((expense, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Expense label"
                    value={expenseLabels[index]}
                    onChange={(e) => handleExpenseLabelChange(e, index)}
                    className="w-1/2 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={expense}
                    onChange={(e) => handleExpenseChange(e, index)}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleRemoveExpense(index)}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Expense
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Summary</h2>
              <p className="text-lg">Total Expenses: ${totalExpenses.toFixed(2)}</p>
              <p className="text-lg">Balance: ${balance.toFixed(2)}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Expense Table</h2>
              <table className="w-full border border-gray-300">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-4 py-2 bg-gray-100"
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="px-4 py-2 border-t border-gray-300"
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Export to Excel
              </button>
            </div>
          </div>
        </section>
        
      </main>

      <footer>
        {/* Add your site footer */}
      </footer>
    </div>
    
  );

  
};

  

export default BudgetPage;
