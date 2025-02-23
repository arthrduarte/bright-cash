"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Generate last 12 months of data
const generateMonthlyData = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12
    return {
      month: months[monthIndex],
      income: Math.floor(Math.random() * 3000) + 2000, // Random income between 2000-5000
      expenses: Math.floor(Math.random() * 2000) + 500, // Random expenses between 500-2500
    }
  }).reverse()

  return last12Months
}

const data = generateMonthlyData()

const chartConfig = {
  income: {
    label: "Income",
    theme: {
      light: "rgb(34, 197, 94)", // green-500
      dark: "rgb(34, 197, 94)",
    },
  },
  expenses: {
    label: "Expenses",
    theme: {
      light: "rgb(239, 68, 68)", // red-500
      dark: "rgb(239, 68, 68)",
    },
  },
}

export function BalanceChart() {
  // Calculate total balance and percentage change
  const totalIncome = data.reduce((sum, month) => sum + month.income, 0)
  const totalExpenses = data.reduce((sum, month) => sum + month.expenses, 0)
  const balance = totalIncome - totalExpenses
  
  // Calculate percentage change (using last two months)
  const lastMonth = data[data.length - 1]
  const previousMonth = data[data.length - 2]
  const lastMonthBalance = lastMonth.income - lastMonth.expenses
  const previousMonthBalance = previousMonth.income - previousMonth.expenses
  const percentageChange = ((lastMonthBalance - previousMonthBalance) / previousMonthBalance) * 100

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Balance
          </CardTitle>
          <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
        </div>
        <Badge variant="outline" className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}>
          {percentageChange >= 0 ? "+" : ""}{percentageChange.toFixed(1)}%
        </Badge>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => ["$" + value.toLocaleString()]}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Legend />
            <Bar 
              dataKey="income" 
              name="Income" 
              fill="rgb(34, 197, 94)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="expenses" 
              name="Expenses" 
              fill="rgb(239, 68, 68)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 