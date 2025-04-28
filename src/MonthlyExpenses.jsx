import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function MonthlyExpenses({ onUpdateTotalMonthly }) {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("monthlyExpenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    onUpdateTotalMonthly(total);
    localStorage.setItem("monthlyExpenses", JSON.stringify(expenses));
  }, [expenses, onUpdateTotalMonthly]);

  const addExpense = () => {
    if (!newAmount || !newDescription) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
      });
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
    toast({
      title: "Succès",
      description: "Dépense ajoutée",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Charges Mensuelles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Montant"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <Input
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Button onClick={addExpense}>Ajouter Dépense</Button>
          </div>
          <div className="space-y-2">
            {expenses.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg flex justify-between"
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
      </CardContent>
    </Card>
  );
}
