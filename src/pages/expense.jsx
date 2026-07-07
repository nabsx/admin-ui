import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import ExpenseCard from "../components/Fragments/ExpenseCard";
import CircularProgress from "@mui/material/CircularProgress";
import { getExpensesService } from "../services/authService";

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await getExpensesService();
        setExpenses(data.data || []);
        setError(null);
      } catch (err) {
        setError(err.msg || "Gagal mengambil data expenses");
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Expenses Comparison
          </h1>
          <p className="text-gray-600">
            Track and compare your spending across categories
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center min-h-96 text-primary">
            <CircularProgress color="inherit" size={50} enableTrackSlot />
            <p className="mt-4 text-gray-600">Loading Data</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-700 font-semibold">No expenses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((expense, index) => (
              <ExpenseCard
                key={index}
                category={expense.category}
                amount={expense.amount}
                percentage={expense.percentage}
                trend={expense.trend}
                items={expense.items}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ExpensePage;
