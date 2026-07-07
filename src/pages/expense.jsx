import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import ExpenseCard from "../components/Fragments/ExpenseCard";
import CircularProgress from "@mui/material/CircularProgress";
import { getExpensesService } from "../services/authService";
import { expensesBreakdowns } from "../data/data";

// Sample expense items for each category
const sampleExpenseItems = {
  Housing: [
    { name: "House Rent", date: "2023-05-17", amount: 230 },
    { name: "Parking", date: "2023-05-17", amount: 20 },
  ],
  Food: [
    { name: "Grocery", date: "2023-05-17", amount: 230 },
    { name: "Restaurant Bill", date: "2023-05-17", amount: 120 },
  ],
  Transportation: [
    { name: "Taxi Fare", date: "2023-05-17", amount: 30 },
    { name: "Metro Card Bill", date: "2023-05-17", amount: 20 },
  ],
  Entertainment: [
    { name: "Movie Ticket", date: "2023-05-17", amount: 30 },
    { name: "iTunes", date: "2023-05-17", amount: 50 },
  ],
  Shopping: [
    { name: "Shirt", date: "2023-05-17", amount: 230 },
    { name: "Jeans", date: "2023-05-17", amount: 190 },
  ],
  Others: [
    { name: "Donation", date: "2023-05-17", amount: 30 },
    { name: "Gift", date: "2023-05-17", amount: 20 },
  ],
};

// Determine trend based on percentage (arbitrary logic for demo)
const getTrendType = (categoryId) => {
  const trendCategories = {
    1: "up",    // Housing: 15% up
    2: "down",  // Food: 8% down
    3: "down",  // Transportation: 12% down
    4: "down",  // Entertainment: 15% down
    5: "up",    // Shopping: 25% up
    6: "up",    // Others: 23% up
  };
  return trendCategories[categoryId] || "down";
};

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await getExpensesService();
        // Try to use API data if available
        if (data && data.data && data.data.length > 0) {
          setExpenses(data.data);
        } else {
          // Fallback to mock data with items
          const mockExpenses = expensesBreakdowns.map((expense) => ({
            category: expense.category,
            amount: expense.amount,
            percentage: expense.percentage,
            trend: getTrendType(expense.id),
            items: sampleExpenseItems[expense.category] || [],
          }));
          setExpenses(mockExpenses);
        }
        setError(null);
      } catch (err) {
        // On error, use mock data as fallback
        const mockExpenses = expensesBreakdowns.map((expense) => ({
          category: expense.category,
          amount: expense.amount,
          percentage: expense.percentage,
          trend: getTrendType(expense.id),
          items: sampleExpenseItems[expense.category] || [],
        }));
        setExpenses(mockExpenses);
        setError(null);
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
