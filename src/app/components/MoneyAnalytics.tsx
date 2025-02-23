'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const monthlyData = [
  { month: "Jan", amount: 1000 },
  { month: "Feb", amount: 1500 },
  { month: "Mar", amount: 2000 },
  { month: "Apr", amount: 4300 },
]

const chartConfig = {
  amount: {
    label: "Amount",
    theme: {
      light: "rgb(37, 99, 235)",
      dark: "rgb(37, 99, 235)",
    },
  },
}

export function MoneyAnalytics() {
  console.log('Rendering MoneyAnalytics component')
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Money Analytics</CardTitle>
            <p className="text-sm text-muted-foreground">You save 10% more than last month 🎉</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Jan</Button>
            <Button variant="outline" size="sm">Feb</Button>
            <Button variant="outline" size="sm">Mar</Button>
            <Button variant="outline" size="sm">Apr</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(37, 99, 235)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(37, 99, 235)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="rgb(37, 99, 235)" 
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 