import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@shared/schema";
import { ArrowUpIcon, ArrowDownIcon, PiggyBankIcon } from "lucide-react";

interface DashboardStatsProps {
  transactions: Transaction[];
}

export default function DashboardStats({ transactions }: DashboardStatsProps) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalInvestments = transactions
    .filter(t => t.type === "investment")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold truncate">${totalIncome.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold truncate">${totalExpenses.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
          <PiggyBankIcon className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold truncate">${totalInvestments.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
