import { Transaction } from "@shared/schema";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { subMonths, format, startOfMonth, endOfMonth } from "date-fns";

interface CashflowChartProps {
  transactions: Transaction[];
}

export default function CashflowChart({ transactions }: CashflowChartProps) {
  // Get the last 12 months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      date,
      label: format(date, 'MMM'),
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  }).reverse();

  // Calculate income and expenses for each month
  const monthlyData = months.map(month => {
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= month.start && transactionDate <= month.end;
    });

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      month: month.label,
      income,
      expenses,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Cashflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <BarChart
            borderRadius={10}
            dataset={monthlyData}
            xAxis={[{ 
              scaleType: 'band',
              dataKey: 'month',
              tickLabelStyle: {
                angle: 0,
                fontSize: 16,
              },
            }]}
            yAxis={[{
              scaleType: 'linear',
              tickLabelStyle: {
                display: 'none',
              },
            }]}
            series={[
              { 
                dataKey: 'expenses',
                label: 'Expenses',
                stack: 'stack',
                color: '#F43F5E', // Red color
              },
              { 
                dataKey: 'income',
                label: 'Income',
                stack: 'stack',
                color: '#10B981', // Green color
              },
            ]}
            height={300}
            margin={{
              top: 10,
              right: 10,
              bottom: 50,
              left: 10,
            }}
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            sx={{
              '& .MuiChartsAxis-line': { display: 'none' },
              '& .MuiChartsAxis-tick': { display: 'none' },
              '& .MuiChartsGrid-root': { display: 'none' },
              '& .MuiChartsAxis-tickLabel': { fill: '#64748B' },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
} 