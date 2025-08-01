import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Bell,
  Link,
  CreditCard,
  Shield,
  Clock,
  Languages,
  ImagePlus,
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderStatus: true,
    reviews: true,
    promotions: false,
  });

  return (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your restaurant's preferences and configurations
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2"
          >
            <SettingsIcon className="h-4 w-4" />
            Restaurant Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="flex items-center gap-2"
          >
            <Link className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Restaurant Profile */}
        <TabsContent value="profile">
          <Card className="p-6">
            <div className="space-y-8">
              {/* Logo Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Restaurant Logo</h3>
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input
                    id="name"
                    defaultValue="The Grand Kitchen"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="A fine dining experience with modern cuisine"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 234 567 890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="contact@grandkitchen.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    defaultValue="123 Restaurant Street, Foodie City"
                  />
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Operating Hours</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Opening Time</Label>
                    <Input
                      type="time"
                      defaultValue="11:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Time</Label>
                    <Input
                      type="time"
                      defaultValue="23:00"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Notification Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Orders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new orders
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newOrders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        newOrders: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Status Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when order status changes
                    </p>
                  </div>
                  <Switch
                    checked={notifications.orderStatus}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        orderStatus: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Customer Reviews</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for new customer reviews
                    </p>
                  </div>
                  <Switch
                    checked={notifications.reviews}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        reviews: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Promotional Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing and promotional notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        promotions: checked,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Connected Services</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Payment Gateway</div>
                    <div className="text-sm text-muted-foreground">
                      Stripe payment processing
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">
                      Delivery Integration
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Connect with delivery services
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">
                      Inventory Management
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Track and manage inventory
                    </div>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Subscription & Billing</h3>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-medium">Current Plan</div>
                    <div className="text-sm text-muted-foreground">
                      Professional Plan
                    </div>
                  </div>
                  <Button>Upgrade Plan</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Payment Method</h4>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <div className="text-sm text-muted-foreground">
                        Expires 12/24
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Edit</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Billing History</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">Professional Plan</div>
                      <div className="text-sm text-muted-foreground">
                        March 1, 2024
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$49.99</div>
                      <Button
                        variant="link"
                        className="h-auto p-0"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                  {/* Add more billing history items */}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
