import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

import TransactionsTable from "@/components/admin/TransactionsTable";

const Transactions = () => {
  const { id } = useParams();

  return (
    <Card
      className=""
      x-chunk="dashboard-01-chunk-4"
    >
      <CardHeader className="flex flex-row items-center ">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent orders from your restaurant.</CardDescription>
        </div>
        <Button
          asChild
          size="sm"
          className="ml-auto gap-1"
        >
          <Link to={`/${id}/orders`}>
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <TransactionsTable />
      </CardContent>
    </Card>
  );
};
export default Transactions;
