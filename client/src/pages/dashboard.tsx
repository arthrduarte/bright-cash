import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { isWithinInterval, startOfDay, endOfDay, format, parseISO } from "date-fns";
import DashboardStats from "@/components/dashboard-stats";
import TransactionDialog from "@/components/transaction-dialog";
import { DateRangePicker } from "@/components/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon, CopyIcon } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import EditTransactionDialog from "@/components/edit-transaction-dialog";
import DuplicateTransactionDialog from "@/components/duplicate-transaction-dialog";
import CashflowChart from "@/components/cashflow-chart";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [duplicatingTransaction, setDuplicatingTransaction] = useState<Transaction | null>(null);

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const filteredTransactions = transactions?.filter((transaction) => {
    if (!dateRange?.from) return true;

    const transactionDate = new Date(transaction.date);
    const fromDate = startOfDay(dateRange.from);
    const toDate = endOfDay(dateRange.to || dateRange.from);

    return isWithinInterval(transactionDate, { start: fromDate, end: toDate });
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Financial Dashboard</h1>
      </div>

      <CashflowChart transactions={transactions || []} />

      <DashboardStats transactions={filteredTransactions || []} />

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            <TransactionDialog />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="w-[90px]">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Account</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Description</TableHead>
                  <TableHead className="text-right w-[100px]">Amount</TableHead>
                  <TableHead className="w-[68px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions?.sort((a, b) => 
                  new Date(b.date).getTime() - new Date(a.date).getTime()
                ).map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(transaction.date), 'MMM d')}</TableCell>
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
                    <TableCell className="hidden md:table-cell capitalize">{transaction.accountType}</TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.category}</TableCell>
                    <TableCell className="hidden sm:table-cell max-w-[200px] truncate">{transaction.description}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap">
                      <span className={transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}>
                        ${Number(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-0.5 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setDuplicatingTransaction(transaction)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingTransaction(transaction)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteMutation.mutate(transaction.id!)}
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
        </CardContent>
      </Card>
      <EditTransactionDialog
        transaction={editingTransaction!}
        open={editingTransaction !== null}
        onOpenChange={(open) => !open && setEditingTransaction(null)}
      />
      <DuplicateTransactionDialog
        transaction={duplicatingTransaction}
        open={duplicatingTransaction !== null}
        onOpenChange={(open) => !open && setDuplicatingTransaction(null)}
      />
    </div>
  );
}