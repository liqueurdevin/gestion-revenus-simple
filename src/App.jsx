import React, { useState, useEffect } from "react";

function App() {
  // État pour stocker les dépenses (récupérées depuis localStorage au démarrage)
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // État pour les champs du formulaire
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Sauvegarde les dépenses dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Fonction pour ajouter une nouvelle dépense
  const addExpense = () => {
    if (!newAmount || !newDescription) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    const expense = {
      amount: parseFloat(newAmount),
      description: newDescription,
      date: new Date().toISOString(),
    };
    setExpenses([...expenses, expense]);
    setNewAmount("");
    setNewDescription("");
    alert("Dépense ajoutée");
  };

  // Calcule le total des dépenses
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-full mx-auto">
