import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useOnboarding from "@/stores/useOnboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Save, Download, Eye } from "lucide-react";

// Commented out API function
/*
const fetchRestaurantData = async () => {
  const response = await fetch('/api/restaurant-data');
  if (!response.ok) {
    throw new Error('Failed to fetch restaurant data');
  }
  return response.json();
};
*/

const RestaurantOverview = () => {
  const { restaurantDetails, menuItems, floorPlan, users } = useOnboarding();

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["restaurantData"],
  //   queryFn: fetchRestaurantData,

  // });

  // if (isLoading) return <LoadingSkeleton />;
  // if (error) return <div>Error loading data</div>;

  // const { restaurantDetails, menuItems, floorPlan, users } = data;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Restaurant Overview
      </h1>
      <div className="grid grid-cols-1 gap-8">
        <RestaurantDetails details={restaurantDetails} />
        <MenuItems items={menuItems} />
        <FloorPlan plan={floorPlan} />
        <Users users={users} />
      </div>
    </div>
  );
};

const RestaurantDetails = ({ details }) => {
  const [editMode, setEditMode] = useState(false);
  const [localDetails, setLocalDetails] = useState(details);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save logic here
    setEditMode(false);
  };

  console.log("Details: ", details);

  return (
    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-2xl text-gray-800">
          Restaurant Details
          <Button
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            variant="outline"
          >
            {editMode ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <Edit className="w-4 h-4 mr-2" />
            )}
            {editMode ? "Save" : "Edit"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localDetails.logo && (
            <div className="col-span-full flex justify-center pb-4">
              <img
                src={
                  URL.createObjectURL(localDetails.logo) || "/placeholder.svg"
                }
                alt="Restaurant Logo"
                className="rounded-full w-32 h-32 object-cover shadow-md"
              />
            </div>
          )}
          {Object.entries(localDetails).map(
            ([key, value]) =>
              key !== "logo" && (
                <div
                  key={key}
                  className="space-y-2"
                >
                  <Label
                    htmlFor={key}
                    className="text-sm font-medium text-gray-700"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  {editMode ? (
                    <Input
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{value}</p>
                  )}
                </div>
              )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MenuItems = ({ items }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Card className=" shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-2xl text-gray-800">
          Menu Items
          <Button
            onClick={() => setEditMode(!editMode)}
            variant="outline"
          >
            {editMode ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <Edit className="w-4 h-4 mr-2" />
            )}
            {editMode ? "Save" : "Edit"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>${item.price?.toFixed(2)}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const FloorPlan = ({ plan }) => {
  const [editMode, setEditMode] = useState(false);

  const downloadQRCode = (url, tableName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `table-${tableName}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const downloadAllQRCodes = () => {
    floors.forEach((floor) => {
      floor.tables.forEach((table) => {
        downloadQRCode(table.qrCode, `${floor.name}-${table.number}`);
      });
    });
  };

  return (
    <Card className=" shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-2xl text-gray-800">
          Floor Plan
          <Button
            onClick={() => setEditMode(!editMode)}
            variant="outline"
          >
            {editMode ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <Edit className="w-4 h-4 mr-2" />
            )}
            {editMode ? "Save" : "Edit"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={plan.floors[0]?.name || "floor1"}>
          <TabsList className="bg-transparent">
            {plan.floors.map((floor, index) => (
              <TabsTrigger
                key={index}
                value={floor.name}
                className=""
              >
                {floor.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {plan.floors.map((floor, floorIndex) => (
            <TabsContent
              key={floorIndex}
              value={floor.name}
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Table Number</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>QR Code</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {floor.tables.map((table, tableIndex) => (
                      <TableRow key={tableIndex}>
                        <TableCell className="font-medium">
                          {tableIndex + 1}
                        </TableCell>
                        <TableCell>{table.capacity}</TableCell>
                        <TableCell>
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://optimenu.com/restaurant-id/table-${
                              tableIndex + 5
                            }/menu`}
                            alt={`QR Code for table ${tableIndex}`}
                            className="h-12 w-12"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                window.open(table.qrCode, "_blank", "noopener")
                              }
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                downloadQRCode(
                                  table.qrCode,
                                  `${floor.name}-${tableIndex + 1}`
                                )
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const Users = ({ users }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Card className=" shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-2xl text-gray-800">
          Users
          <Button
            onClick={() => setEditMode(!editMode)}
            variant="outline"
          >
            {editMode ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <Edit className="w-4 h-4 mr-2" />
            )}
            {editMode ? "Save" : "Edit"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <div className="container mx-auto p-4 space-y-8">
    <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
    <div className="space-y-8">
      <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

export default RestaurantOverview;
