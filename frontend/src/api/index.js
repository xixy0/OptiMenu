//const baseURL = "http://192.168.1.126:5000";
const baseURL = "http://localhost:5000";

// const baseURL = "http://localhost:5000";
//const baseURL = "http://192.168.1.12

export const getRevenue = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/totalrevenue`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get revenue");
  }
};

export const getSales = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/getsales`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentTransactions = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/recent`);
    const data = await response.json();
    console.log("getrecent");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get recent transactions");
  }
};

export const getAllOrders = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/orders`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (id) => {
  try {
    console.log("from api", id);
    const response = await fetch(`${baseURL}/admin/Orders/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get order");
  }
};

export const getCurrentDayStats = async () => {
  try {
    console.log("current day");
    const response = await fetch(`${baseURL}/admin/slotrevenue`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get current day stats");
  }
};

export const getDayStats = async (date) => {
  try {
    const response = await fetch(`${baseURL}/admin/slotrevenue/${date}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get current day stats");
  }
};

export const addnewUser = async (username, password, role) => {
  try {
    const response = await fetch(`${baseURL}/admin/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add user");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${baseURL}/admin/deleteuser/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user");
  }
};

export const getMLMenu = async () => {
  try {
    const response = await fetch(`http://localhost:8001/predict`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get menu");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/users`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get users");
  }
};

export const getWeeklyStats = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/weeklystats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get weekly stats");
  }
};

export const getcurrentdayrevenue = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/currentday`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get current day stats");
  }
};

export const getMonthlyStats = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/monthlystats`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get monthly stats");
  }
};

export const mostSoldItem = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/mostsolditem`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get most sold item");
  }
};

export const mostSoldItemInWeek = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/mostsolditemweek`);
    const data = await response.json();
    console.log("mostsolditem :", data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get most sold item in week");
  }
};

export const mostSoldItemInMonth = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/mostsolditemmonth`);
    const data = await response.json();
    console.log("from monthhhhh ", data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get most sold item in month");
  }
};

export const getPeakHours = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/peakhours`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get peak hours");
  }
};

export const getPeakHoursInWeek = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/peakhours-week`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get peak hours in week");
  }
};

export const getPeakHoursInMonth = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/peakhours-month`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get peak hours in month");
  }
};

export const getWeeklyRevenueStats = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/weeklyrevenue`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMonthlyRevenueStats = async () => {
  try {
    console.log("calling apiii");
    const response = await fetch(`${baseURL}/admin/monthlyrevenue`);
    const data = await response.json();
    console.log("from api monthly", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularItems = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/popularitems`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrders = async (role) => {
  console.log(baseURL);
  console.log(`${baseURL}/orders/${role}`);
  console.log("fetchorders!!!");
  const response = await fetch(`${baseURL}/orders/${role}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching orders: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(data);
  console.log("from" + role);
  return data;
};

export const updateOrderStatus = async ({ status, id, itemName }) => {
  console.log("updating the Order ", id);
  console.log("Data", status, id, itemName);
  const response = await fetch(`${baseURL}/orders/updateStatus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, id, itemName }),
  });
  if (!response.ok) {
    throw new Error(`Error updating order status: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const cancelOrder = async (orderId) => {
  console.log("about to delete");
  const response = await fetch(`${baseURL}/orders/cancelOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
  });
  if (!response.ok) {
    throw new Error(`Error canceling order: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const getCustomers = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/customers`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAverageOrderValue = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/averageordervalue`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (data) => {
  try {
    const response = await fetch(`${baseURL}/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign up");
  }
};

export const getItemPerformance = async (dateRange) => {
  console.log("Fetching item performance for date range:", dateRange);
  // const queryParams = new URLSearchParams(dateRange).toString(); // Converts object to query string
  const response = await fetch(
    `${baseURL}/analytics/itemPerformance/${dateRange}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) {
    throw new Error(`Error fetching item performance: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

// Fetch time slot analysis data
export const getTimeSlotAnalysis = async (dateRange) => {
  console.log("Fetching time slot analysis for date range:", dateRange);
  //const queryParams = new URLSearchParams(dateRange).toString(); // Converts object to query string
  const response = await fetch(
    `${baseURL}/analytics/timeSlotAnalysis/${dateRange}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error fetching time slot analysis: ${response.statusText}`
    );
  }
  const data = await response.json();
  return data;
};

export const getTopSellingItems = async (dateRange) => {
  console.log("Fetching top selling:");
  //const queryParams = new URLSearchParams(dateRange).toString(); // Converts object to query string
  const response = await fetch(`${baseURL}/analytics/topselling/${dateRange}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(
      `Error fetching time slot analysis: ${response.statusText}`
    );
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export const getConversionRate = async (daterange) => {
  try {
    console.log("Fetching conversion rate");
    const response = await fetch(`${baseURL}/analytics/conversionrate`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPredictions = async () => {
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
export const getActiveUsers = async () => {
  try {
    const response = await fetch(`${baseURL}/admin/activeusers`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get active users");
  }
};

export const fetchMenuItems = async () => {
  try {
    console.log("Fetching menu items");
    const response = await fetch(`${baseURL}/menu`); // Replace with your API URL
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch menu items:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const ordercycle = async (userId) => {
  try {
    console.log("Fetching conversion rate");
    const response = await fetch(`${baseURL}/orders/orderlife/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Delete Menu Item
export const deleteMenuItem = async (id) => {
  const response = await fetch(`${baseURL}/admin/delete/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete menu item");
  }

  return response.json();
};

export const addMenuItem = async (item) => {
  const formData = new FormData();
  formData.append("name", item.name);
  formData.append("description", item.description);
  formData.append("price", item.price);
  if (item.imageFile) {
    formData.append("image", item.imageFile);
  }
  formData.append("category", item.category);
  formData.append("isVeg", item.isVeg);

  console.log("Item from form in api", item);

  const response = await fetch(`${baseURL}/upload`, {
    method: "POST",
    // body: item,
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add menu item");
  }

  return response.json();
};

export const updateMenuItem = async (item) => {
  console.log(item);
  const formData = new FormData();
  formData.append("name", item.name);
  console.log(item.name);
  formData.append("description", item.description);
  formData.append("price", item.price);
  if (item.imageFile) {
    formData.append("image", item.imageFile);
  }
  formData.append("category", item.category);
  formData.append("isVeg", item.isVeg);
  // console.log(formData);
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await fetch(`${baseURL}/admin/updateMenu/${item.id}`, {
    method: "PATCH",
    // body: item,
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update menu item");
  }

  return response.json();
};

export const submitOnboardingDetails = async (data) => {
  try {
    const { restaurantDetails, menuItems, floorPlan, users } = data;
    console.log("data: ", data);

    console.log("restaurantDetails", restaurantDetails);
    console.log("menuItems", menuItems);
    console.log("floorPlan", floorPlan);
    console.log("users", users);

    const formData = new FormData();

    // Append restaurant details
    formData.append("restaurantDetails[name]", restaurantDetails.name);
    formData.append("restaurantDetails[address]", restaurantDetails.address);
    formData.append("restaurantDetails[phone]", restaurantDetails.phone);
    formData.append("restaurantDetails[email]", restaurantDetails.email);

    // Append the restaurant logo if it exists
    if (restaurantDetails.restaurantLogo) {
      formData.append(
        "restaurantDetails[restaurantLogo]",
        restaurantDetails.restaurantLogo
      );
    }

    // Append menu items
    menuItems.forEach((item, index) => {
      formData.append(`menuItems[${index}][name]`, item.name);
      formData.append(`menuItems[${index}][price]`, item.price);
      formData.append(`menuItems[${index}][category]`, item.category);
      formData.append(`menuItems[${index}][description]`, item.description);

      // Append the image file if it exists
      if (item.imageFile) {
        formData.append(`menuItems[${index}][imageFile]`, item.imageFile);
      }
    });

    // Append floor plan
    floorPlan.floors.forEach((floor, index) => {
      formData.append(`floorPlan[${index}][name]`, floor.name);
      formData.append(`floorPlan[${index}][tableCount]`, floor.tableCount);
    });

    // Append users
    users.forEach((user, index) => {
      formData.append(`users[${index}][name]`, user.name);
      formData.append(`users[${index}][email]`, user.email);
      formData.append(`users[${index}][password]`, user.password);
      formData.append(`users[${index}][role]`, user.role);
    });

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const response = await fetch(`${baseURL}/admin/onboarding`, {
      method: "POST",
      body: formData,
    });

    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to submit onboarding details");
  }
};

export const addRestaurantDetails = async (restDetails) => {
  const formData = new FormData();
  formData.append("name", restDetails.name);
  formData.append("address", restDetails.address);
  formData.append("phone", restDetails.phone);
  if (restDetails.logo) {
    formData.append("logo", restDetails.logo);
  }
  formData.append("email", restDetails.email);
  try {
    const response = await fetch(`${baseURL}/onboarding/restaurantDetails`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("Inserted ID:", data.id);
    return data.id;
  } catch (error) {
    throw new Error("Failed to add restaurant details");
  }
};

export const addFloorPlan = async (floorPlan) => {
  console.log(floorPlan);
  try {
    const response = await fetch(`${baseURL}/onboarding/floorplan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(floorPlan),
    });
    const data = await response.json();
    console.log(data);
    return { msg: "Floor plan added successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add floor plan");
  }
};

export const fetchBill = async (userId) => {
  console.log("fetching bill");
  // ADD WHATEVER PARAMETERS YOU NEED
  try{
  const response = await fetch(`${baseURL}/orders/bills/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
  });
  const data = await response.json();
  console.log(data);
  return data;
} catch (error) {
  console.log(error);
}
};
