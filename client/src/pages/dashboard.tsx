import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import DashboardStats from "@/components/dashboard-stats";
import DashboardChart from "@/components/dashboard-chart";
import TransactionDialog from "@/components/transaction-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
        </div>
        <Skeleton className="h-[400px] mt-4" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
        <TransactionDialog />
      </div>

      <DashboardStats transactions={transactions || []} />
      <DashboardChart transactions={transactions || []} />

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                  <TableCell className="capitalize">{transaction.type}</TableCell>
                  <TableCell className="capitalize">{transaction.accountType}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${Number(transaction.amount).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(transaction.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}