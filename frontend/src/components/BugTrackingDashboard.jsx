import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

// Dummy data for bug reports
const initialBugs = [
  {
    id: "BUG-001",
    subject: "Login button not working on Safari",
    url: "https://example.com/login",
    description:
      "When clicking the login button on Safari browser, nothing happens. Works fine on Chrome and Firefox.",
    severity: "4",
    status: "active",
    reportedAt: "2023-11-10T14:30:00Z",
  },
  {
    id: "BUG-002",
    subject: "Images not loading on product page",
    url: "https://example.com/products/123",
    description:
      "Product images fail to load on the product detail page. Console shows 404 errors.",
    severity: "3",
    status: "active",
    reportedAt: "2023-11-12T09:15:00Z",
  },
  {
    id: "BUG-003",
    subject: "Typo in footer copyright text",
    url: "https://example.com",
    description: "The copyright year in the footer shows 2022 instead of 2023.",
    severity: "1",
    status: "completed",
    reportedAt: "2023-11-05T11:45:00Z",
  },
  {
    id: "BUG-004",
    subject: "Checkout process crashes on payment step",
    url: "https://example.com/checkout/payment",
    description:
      "When users try to proceed to payment, the application crashes with a JavaScript error.",
    severity: "5",
    status: "active",
    reportedAt: "2023-11-14T16:20:00Z",
  },
  {
    id: "BUG-005",
    subject: "Search results not showing all relevant items",
    url: "https://example.com/search?q=shoes",
    description:
      "Search for 'shoes' doesn't return all shoe products that exist in the catalog.",
    severity: "2",
    status: "active",
    reportedAt: "2023-11-13T10:30:00Z",
  },
  {
    id: "BUG-006",
    subject: "Account settings page layout broken on mobile",
    url: "https://example.com/account/settings",
    description:
      "The layout of the account settings page is broken on mobile devices, making some options inaccessible.",
    severity: "3",
    status: "completed",
    reportedAt: "2023-11-08T13:45:00Z",
  },
  {
    id: "BUG-007",
    subject: "Newsletter signup always shows error",
    url: "https://example.com/newsletter",
    description:
      "Users cannot sign up for the newsletter as the form always returns an error, even with valid email addresses.",
    severity: "2",
    status: "active",
    reportedAt: "2023-11-15T09:10:00Z",
  },
];

const severityMap = {
  1: { label: "Low", color: "bg-gray-500" },
  2: { label: "Slight", color: "bg-blue-500" },
  3: { label: "Moderate", color: "bg-yellow-500" },
  4: { label: "High", color: "bg-orange-500" },
  5: { label: "Critical", color: "bg-red-500" },
};

const BugTrackingDashboard = () => {
  const [bugs, setBugs] = useState(initialBugs);
  const [activeTab, setActiveTab] = useState("active");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredBugs = useMemo(() => {
    return bugs.filter((bug) => bug.status === activeTab);
  }, [bugs, activeTab]);

  const sortedBugs = useMemo(() => {
    return [...filteredBugs].sort((a, b) => {
      if (sortOrder === "desc") {
        return Number.parseInt(b.severity) - Number.parseInt(a.severity);
      } else {
        return Number.parseInt(a.severity) - Number.parseInt(b.severity);
      }
    });
  }, [filteredBugs, sortOrder]);

  const markAsResolved = (id) => {
    setBugs(
      bugs.map((bug) => (bug.id === id ? { ...bug, status: "completed" } : bug))
    );
    toast.success("Bug marked as resolved", {
      description: `Bug ${id} has been marked as resolved.`,
    });
  };

  const reopenBug = (id) => {
    setBugs(
      bugs.map((bug) => (bug.id === id ? { ...bug, status: "active" } : bug))
    );
    toast("Bug reopened", {
      description: `Bug ${id} has been reopened.`,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl flex items-center justify-between">
            <span>Bug Tracking Dashboard</span>
            <span className="text-sm font-normal text-muted-foreground">
              {bugs.filter((bug) => bug.status === "active").length} active
              issues
            </span>
          </CardTitle>
          <CardDescription>
            Track and manage reported bugs in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="active"
            onValueChange={setActiveTab}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger
                  value="active"
                  className="flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Active</span>
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </TabsTrigger>
              </TabsList>

              {activeTab === "active" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Sort by severity:
                  </span>
                  <Select
                    value={sortOrder}
                    onValueChange={(value) => setSortOrder(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Highest first</SelectItem>
                      <SelectItem value="asc">Lowest first</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <TabsContent
              value="active"
              className="mt-0"
            >
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden md:table-cell">
                        URL
                      </TableHead>
                      <TableHead className="w-[100px]">
                        <div className="flex items-center">
                          Severity
                          <ArrowUpDown
                            className="ml-2 h-4 w-4 cursor-pointer"
                            onClick={() =>
                              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                            }
                          />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell w-[120px]">
                        Reported
                      </TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedBugs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-24 text-center"
                        >
                          No active bugs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedBugs.map((bug) => (
                        <TableRow key={bug.id}>
                          <TableCell className="font-medium">
                            {bug.id}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{bug.subject}</div>
                              <div className="text-sm text-muted-foreground md:hidden mt-1 line-clamp-2">
                                {bug.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <a
                              href={bug.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:underline"
                            >
                              <LinkIcon className="h-3 w-3 mr-1" />
                              <span className="truncate max-w-[200px]">
                                {bug.url.replace(/^https?:\/\//, "")}
                              </span>
                            </a>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                severityMap[bug.severity].color
                              } text-white`}
                            >
                              {severityMap[bug.severity].label}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{formatDate(bug.reportedAt)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsResolved(bug.id)}
                              className="whitespace-nowrap"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Resolved
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent
              value="completed"
              className="mt-0"
            >
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden md:table-cell">
                        URL
                      </TableHead>
                      <TableHead className="w-[100px]">Severity</TableHead>
                      <TableHead className="hidden md:table-cell w-[120px]">
                        Reported
                      </TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBugs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-24 text-center"
                        >
                          No resolved bugs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBugs.map((bug) => (
                        <TableRow key={bug.id}>
                          <TableCell className="font-medium">
                            {bug.id}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{bug.subject}</div>
                              <div className="text-sm text-muted-foreground md:hidden mt-1 line-clamp-2">
                                {bug.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <a
                              href={bug.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:underline"
                            >
                              <LinkIcon className="h-3 w-3 mr-1" />
                              <span className="truncate max-w-[200px]">
                                {bug.url.replace(/^https?:\/\//, "")}
                              </span>
                            </a>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                severityMap[bug.severity].color
                              } text-white`}
                            >
                              {severityMap[bug.severity].label}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{formatDate(bug.reportedAt)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => reopenBug(bug.id)}
                              className="whitespace-nowrap"
                            >
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Reopen
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BugTrackingDashboard;
