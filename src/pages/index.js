import React, { useState } from 'react';
import Navigation from './/Navigation';
import { useTable } from 'react-table';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseLabels, setExpenseLabels] = useState([]);

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
        <section className="py-12 ">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Take Control of Your Finances</h2>
            <p className="text-lg mb-8">
            Managing your personal finances is essential for achieving financial stability and reaching your goals. Our Personal Finance App empowers you to track your income, monitor your expenses, and make informed financial decisions.

With our user-friendly budget calculator, you can easily input your income and expenses, categorize your spending, and see a clear breakdown of your finances. Gain insights into where your money is going and identify areas where you can save.

Our app provides you with dynamic tables and graphs to visualize your financial progress over time.</p>

<p className="text-lg mb-8">Track your income, expenses, and savings with ease, enabling you to make adjustments and improve your financial situation.

Additionally, we offer a comprehensive collection of educational videos that cover a wide range of personal finance topics. From budgeting and saving to investing and retirement planning, our videos provide valuable knowledge to help you make informed financial decisions.

Take the first step towards financial success by using our Personal Finance App. Start managing your money effectively and pave the way for a secure and prosperous future.
            </p>

            {/* Add more information about the app */}
          </div>
        </section>


        <section className="bg-white shadow rounded-lg p-6 mb-6">
  <h2 className="text-2xl font-bold mb-4 text-center">Check Out Our Website Video</h2>
  <div className="flex justify-center">
  <div className="relative border-5 border-03045E rounded-lg">
    <iframe
      height= "675px"
      width= "1200px"
      className="aspect-object inset-0"
      src="https://www.youtube.com/embed/gngcn6_qqkM"
      title="Website Video"
      allowFullScreen
    ></iframe>
  </div>
  </div>
  <div className="mt-8"></div>
  <p className="text-gray-800">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac dui lectus. Nam ullamcorper pellentesque dolor id congue. Sed sed risus quis tellus cursus scelerisque. Suspendisse potenti. Ut fermentum erat ligula, ut lobortis turpis vestibulum a. Fusce nec placerat justo, in ultricies nisi. Integer in neque consectetur, faucibus mi id, consequat ex.
  </p>
  <p className="text-gray-800">
    Morbi tincidunt convallis purus, sed egestas dui mollis sed. Sed eleifend arcu sed leo placerat, nec convallis leo tempor. Donec luctus, ex at sagittis tempus, ipsum odio gravida mi, nec iaculis erat est at mi. Fusce bibendum posuere purus ut facilisis. Aenean sodales urna purus, non aliquam massa blandit eu. Suspendisse potenti. Curabitur efficitur placerat lobortis. 
  </p>
  <p className="text-gray-800">
    Phasellus eu arcu in nibh tristique blandit. Sed in lobortis tellus, et mattis nunc. Vivamus vitae ipsum ut risus interdum rhoncus a sit amet felis. Quisque vestibulum feugiat convallis. Sed blandit nisi eget feugiat sollicitudin. Sed nec dignissim lorem. Suspendisse faucibus congue leo, non commodo lorem efficitur vel.
  </p>
  
</section>

<section className="bg-white shadow rounded-lg p-6 mb-6">
  <h2 className="text-2xl font-bold mb-4 text-center">Testimonials</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nulla!</p>
      <p>-Person</p>
    </div>
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nulla!</p>
      <p>-Person</p>
    </div>
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nulla!</p>
      <p>-Person</p>
    </div>
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
        <span className="text-yellow-400 text-2xl mr-1">⭐</span>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nulla!</p>
      <p>-Person</p>
    </div>
    {/* Repeat the above card for each testimonial */}
  </div>
</section>
      </main>

      <footer>
        {/* Add your site footer */}
      </footer>
    </div>
  );
};

export default App;
