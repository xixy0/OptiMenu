import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getRecentTransactions } from "@/api";

const Transactions = () => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: getRecentTransactions,
    staleTime: 4000,
    refetchInterval: 5000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("from transactions", transactions);
  console.log("from transactions", transactions[0]);
  const user = "table 1"
  // const Transactions = [
  //   {
  //     user: "Table 1",
  //     type: "Sale",
  //     status: "Approved",
  //     date: "2023-06-27",
  //     price: 120.0,
  //   },
  //   {
  //     user: "Table 2",
  //     type: "Sale",
  //     status: "Approved",
  //     date: "2023-06-26",
  //     price: 85.5,
  //   },
  //   {
  //     user: "Table 3",
  //     type: "Subscription",
  //     status: "Approved",
  //     date: "2023-06-25",
  //     price: 150.0,
  //   },
  //   {
  //     user: "Table 4",
  //     type: "Refund",
  //     status: "Declined",
  //     date: "2023-06-24",
  //     price: 60.0,
  //   },
  //   {
  //     user: "Table 5",
  //     type: "Sale",
  //     status: "Approved",
  //     date: "2023-06-23",
  //     price: 99.99,
  //   },
  // ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Table</TableHead>
          {/* <TableHead className="hidden xl:table-column">Type</TableHead> */}
          <TableHead className="hidden xl:table-column">Status</TableHead>
          <TableHead className="hidden xl:table-column">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="font-medium">{user}</div>
          </TableCell>
          <TableCell className="hidden xl:table-column">Sale</TableCell>
          <TableCell className="hidden xl:table-column">
            <Badge
              className="text-xs"
              variant="outline"
            >
              Approved
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-23
          </TableCell>
          <TableCell className="text-right">{transactions[4].price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">{user}</div>
          </TableCell>
          {/* <TableCell className="hidden xl:table-column">Refund</TableCell> */}
          <TableCell className="hidden xl:table-column">
            <Badge
              className="text-xs"
              variant="outline"
            >
              Declined
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-24
          </TableCell>
          <TableCell className="text-right">{transactions[3].price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">{user}</div>
          </TableCell>
          {/* <TableCell className="hidden xl:table-column">Subscription</TableCell> */}
          <TableCell className="hidden xl:table-column">
            <Badge
              className="text-xs"
              variant="outline"
            >
              Approved
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-25
          </TableCell>
          <TableCell className="text-right">{transactions[2].price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">{user}</div>
          </TableCell>
          {/* <TableCell className="hidden xl:table-column">Sale</TableCell> */}
          <TableCell className="hidden xl:table-column">
            <Badge
              className="text-xs"
              variant="outline"
            >
              Approved
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-26
          </TableCell>
          <TableCell className="text-right">{transactions[1].price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">{user}</div>
          </TableCell>
          {/* <TableCell className="hidden xl:table-column">Sale</TableCell> */}
          <TableCell className="hidden xl:table-column">
            <Badge
              className="text-xs"
              variant="outline"
            >
              Approved
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-27
          </TableCell>
          <TableCell className="text-right">{transactions[0].price}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default Transactions;
