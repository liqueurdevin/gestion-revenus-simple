import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import MonthlyExpenses from "./MonthlyExpenses";
import MonthlyIncome from "./MonthlyIncome";
import Summary from "./Summary";

function Dashboard() {
  const [totalExpenses, setTotalExpenses] = useState(() => {
    const saved = localStorage.getItem("totalExpenses");
    return saved ? parseFloat(saved) : 0;
  });
  const [totalIncome, setTotalIncome] = useState(() => {
    const saved = localStorage.getItem("totalIncome");
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("totalExpenses", totalExpenses.toString());
    localStorage.setItem("totalIncome", totalIncome.toString());
  }, [totalExpenses, totalIncome]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-full mx-auto"
      >
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Gestion Financière
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-green-600">
                {totalIncome.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total des Dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-red-600">
                {totalExpenses.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={`text-2xl font-semibold ${
                  totalIncome - totalExpenses >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(totalIncome - totalExpenses).toFixed(2)} €
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <MonthlyExpenses onUpdateTotalMonthly={setTotalExpenses} />
          <MonthlyIncome onUpdateTotalMonthly={setTotalIncome} />
        </div>
        <Link to="/summary">
          <Button>Voir le Récapitulatif</Button>
        </Link>
      </motion.div>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
}

export default App;
