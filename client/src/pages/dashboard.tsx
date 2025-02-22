import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { isWithinInterval, startOfDay, endOfDay, format } from "date-fns";
import DashboardStats from "@/components/dashboard-stats";
import TransactionDialog from "@/components/transaction-dialog";
import { DateRangePicker } from "@/components/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import EditTransactionDialog from "@/components/edit-transaction-dialog";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const filteredTransactions = transactions?.filter((transaction) => {
    if (!dateRange?.from) return true;

    const transactionDate = new Date(transaction.date);

    if (dateRange.to) {
      return isWithinInterval(transactionDate, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to),
      });
    }

    return isWithinInterval(transactionDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.from),
    });
  });

  // Group transactions by date
  const groupedTransactions = filteredTransactions?.reduce((groups, transaction) => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

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

      <DashboardStats transactions={filteredTransactions || []} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {groupedTransactions && Object.entries(groupedTransactions)
              .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
              .map(([date, transactions]) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground/80 px-4 py-2">
                    {format(new Date(date), 'MMMM d, yyyy')}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === 'expense' 
                                ? 'bg-red-100 text-red-800' 
                                : transaction.type === 'income'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="capitalize">{transaction.accountType}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className="text-right font-medium">
                            <span className={transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}>
                              ${Number(transaction.amount).toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingTransaction(transaction)}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteMutation.mutate(transaction.id)}
                                disabled={deleteMutation.isPending}
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      <EditTransactionDialog
        transaction={editingTransaction!}
        open={editingTransaction !== null}
        onOpenChange={(open) => !open && setEditingTransaction(null)}
      />
    </div>
  );
}