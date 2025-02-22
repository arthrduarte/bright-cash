import { Transaction } from "@shared/schema";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO, startOfMonth } from "date-fns";

interface CashFlowChartProps {
  transactions: Transaction[];
}

export default function CashFlowChart({ transactions }: CashFlowChartProps) {
  // Group transactions by month and type
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = startOfMonth(new Date(transaction.date));
    const monthKey = format(date, "yyyy-MM");
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        income: 0,
        expenses: 0,
      };
    }
    
    if (transaction.type === "income") {
      acc[monthKey].income += Number(transaction.amount);
    } else if (transaction.type === "expense") {
      acc[monthKey].expenses += Number(transaction.amount);
    }
    
    return acc;
  }, {} as Record<string, { month: string; income: number; expenses: number; }>);

  // Convert to array and sort by month
  const data = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(item => ({
      ...item,
      month: format(parseISO(item.month), "MMM yyyy"),
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Cash Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
              />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#22c55e" />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
