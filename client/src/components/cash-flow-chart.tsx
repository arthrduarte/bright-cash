import { Transaction } from "@shared/schema";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Line, ComposedChart } from "recharts";
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
        net: 0,
      };
    }

    if (transaction.type === "income") {
      acc[monthKey].income += Number(transaction.amount);
    } else if (transaction.type === "expense") {
      // Store expenses as negative values
      acc[monthKey].expenses -= Number(transaction.amount);
    }

    acc[monthKey].net = acc[monthKey].income + acc[monthKey].expenses;

    return acc;
  }, {} as Record<string, { month: string; income: number; expenses: number; net: number; }>);

  // Convert to array and sort by month
  const data = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(item => ({
      ...item,
      month: format(parseISO(item.month), "MMM"),
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${Math.abs(value).toFixed(2)}`, value >= 0 ? 'Income' : 'Expenses']}
              />
              <Bar dataKey="income" stackId="a" fill="#86efac" /> {/* Light green */}
              <Bar dataKey="expenses" stackId="a" fill="#fca5a5" /> {/* Light red */}
              <Line type="monotone" dataKey="net" stroke="#000000" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}