import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function calculateDemandScore(sales, profit) {
  return Math.round((sales * profit) / 100);
}

export function searchItems(items, searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return items;

  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
  );
}

export const calculateDemandScores = (items, predictions) => {
  if (!predictions || predictions.length === 0) return [];

  const maxProfit = Math.max(...items.map((item) => item.profit));
  const maxPredictedSales = Math.max(
    ...predictions.map((p) => p.predicted_sales)
  );

  const scoredItems = items.map((item, index) => {
    const predictedSales = predictions[index]?.predicted_sales || 0;
    const demandScore =
      ((item.profit * predictedSales) / (maxProfit * maxPredictedSales)) * 100;
    return {
      ...item,
      predictedSales,
      demandScore: parseFloat(demandScore.toFixed(1)),
    };
  });

  return scoredItems.sort((a, b) => b.demandScore - a.demandScore);
};

export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "preparing":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "ready":
      return "bg-green-100 text-green-800 border-green-300";
    case "delivered":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export const generatePassword = (num) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < num; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
