import { Transaction } from "@shared/schema";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CHART_COLORS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardChartProps {
  transactions: Transaction[];
}

export default function DashboardChart({ transactions }: DashboardChartProps) {
  const expensesByCategory = transactions
    .filter(t => t.type === "expense" && t.category) // Only include transactions with categories
    .reduce((acc, t) => {
      const category = t.category as string; // We know category exists due to filter
      acc[category] = (acc[category] || 0) + Number(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByCategory)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value); // Sort by value in descending order

  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total Expenses: ${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, value, percent }) => 
                    `${name}: $${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${(percent * 100).toFixed(1)}%)`
                  }
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [
                    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    'Amount'
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No expenses found for the selected period
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}