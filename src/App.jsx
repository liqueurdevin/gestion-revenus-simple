import React, { useState, useEffect } from "react";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Gestion Financière
        </h1>
        <div className="bg-white p-4 rounded-lg mb-6 shadow">
          <h3 className="font-bold mb-2">Nouvelle Dépense</h3>
          <input
            type="number"
            placeholder="Montant"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={addExpense}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Historique des Dépenses</h3>
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
        </div>
      </div>
    </div>
  );
}

export default App;
