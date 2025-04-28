import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Summary() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("monthlyExpenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem("monthlyIncomes");
    return saved ? JSON.parse(saved) : [];
  });

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-full mx-auto"
      >
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Récapitulatif
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
          <Card>
            <CardHeader>
              <CardTitle>Dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between mb-2"
                >
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold text-red-600">{item.amount.toFixed(2)} €</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              {incomes.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between mb-2"
                >
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold text-green-600">{item.amount.toFixed(2)} €</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Link to="/">
          <Button>Retour au Tableau de Bord</Button>
        </Link>
      </motion.div>
    </div>
  );
}
