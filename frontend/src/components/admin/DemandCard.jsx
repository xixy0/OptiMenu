// import React, { useEffect, useState } from "react";
// import { TrendingUp } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { toPredict } from "@/constants";

// const DemandCard = () => {
//   const [predictions, setPredictions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchPredictions = async () => {
//     console.log("Fetching predictions...");
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(toPredict),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch predictions");
//       }

//       const data = await response.json();
//       console.log("Fetched data:", data);
//       setPredictions(data);  // Properly update the state
//     } catch (err) {
//       console.error("Error fetching predictions:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered");
//     fetchPredictions();
//   }, []); // Empty dependency array ensures this only runs once when the component mounts

//   const calculateDemandScores = (items, predictions) => {
//     if (predictions.length === 0) return []; // Handle the case if predictions are empty

//     const maxProfit = Math.max(...items.map(item => item.profit));
//     const maxPredictedSales = Math.max(...predictions.map(p => p.predicted_sales));

//     const scoredItems = items.map((item, index) => {
//       const predictedSales = predictions[index]?.predicted_sales || 0;
//       const demandScore = (item.profit * predictedSales) / (maxProfit * maxPredictedSales) * 100;
//       return {
//         ...item,
//         predictedSales,
//         demandScore: parseFloat(demandScore.toFixed(1)),
//       };
//     });

//     return scoredItems.sort((a, b) => b.demandScore - a.demandScore);
//   };

//   const sortedItems = calculateDemandScores(toPredict, predictions).slice(0, 5);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   console.log("Sorted Items:", sortedItems);

//   return (
//     <Card className="rounded-lg shadow-md">
//       <CardHeader className="flex items-center mb-4">
//         <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
//         <CardTitle className="text-xl font-semibold text-gray-900">
//           High Demand Items
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {sortedItems.map((item) => (
//           <div key={item.id} className="flex justify-between items-center">
//             <div>
//               <p className="font-medium text-gray-900">{item.name}</p>
//               <p className="text-sm text-gray-600">{item.category}</p>
//             </div>
//             <div className="flex items-center">
//               <span className="text-sm font-semibold text-green-600">
//                 {item.demandScore}%
//               </span>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

// export default DemandCard;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { toPredict } from "@/constants";
// import { fetchPredictions } from "@/api";
// import { calculateDemandScores } from "@/lib/utils";

const fetchPredictions = async () => {
  console.log("Fetching predictions...");
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toPredict),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch predictions");
  }

  return response.json();
};

const calculateDemandScores = (items, predictions) => {
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

const DemandCard = () => {
  const {
    data: predictions,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["predictions"],
    queryFn: fetchPredictions,
  });

  const sortedItems = calculateDemandScores(toPredict, predictions || []).slice(
    0,
    5
  );

  if (isLoading) {
    return (
      <Card className="rounded-lg shadow-md">
        <CardHeader className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            High Demand Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-6 w-full"
            />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert
        variant="destructive"
        className="rounded-lg shadow-md"
      >
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || "An error occurred while fetching predictions."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="rounded-lg shadow-md">
      <CardHeader className="flex items-center mb-4">
        <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
        <CardTitle className="text-xl font-semibold text-gray-900">
          High Demand Items
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.category}</p>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-green-600">
                {item.demandScore}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DemandCard;
