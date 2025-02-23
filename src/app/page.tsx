import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MoneyAnalytics } from "./components/MoneyAnalytics"
import { MainNav } from "./components/MainNav"
import { BalanceChart } from "./components/BalanceChart"

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

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <MainNav />
      
      <main className="flex-1 overflow-x-hidden">
        <div className="container py-6 space-y-6">
          {/* Balance Chart */}
          <BalanceChart />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <h3 className="text-sm font-medium">Your Income</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">$1220.00</span>
                  <Badge variant="outline" className="text-green-500">+10%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Your Income Amount</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <h3 className="text-sm font-medium">Total Expenses</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">$230.21</span>
                  <Badge variant="outline" className="text-red-500">2%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Your Total Spend</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <h3 className="text-sm font-medium">Total Money</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">$5250.00</span>
                  <Badge variant="outline" className="text-green-500">+15%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Total money in your wallet</p>
              </CardContent>
            </Card>
          </div>

          {/* Money Analytics */}
          <MoneyAnalytics />

          {/* Transactions Section */}
          <Tabs defaultValue="all-transaction" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all-transaction">All Transaction</TabsTrigger>
              <TabsTrigger value="saving-plan">Saving Plan</TabsTrigger>
              <TabsTrigger value="schedule-payment">Schedule Payment</TabsTrigger>
              <TabsTrigger value="transaction-history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="all-transaction">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Transaction</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Search</Button>
                      <Button variant="outline" size="sm">Filter</Button>
                      <Button variant="outline" size="sm">This Month</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Transaction items would go here */}
                    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                        <div>
                          <p className="font-medium">Ahmad Mulyadi</p>
                          <p className="text-sm text-muted-foreground">#CF2323</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-500">- $500.00</p>
                        <p className="text-sm text-muted-foreground">02 Jan 2022</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saving-plan">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Saving Plan</CardTitle>
                    <Button size="sm">New Plan +</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M6 17h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
                            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <path d="M15 11v4"/>
                            <path d="M9 11v4"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Buying a Tesla car</h3>
                          <p className="text-sm text-muted-foreground">Target Collection Jul 2030</p>
                        </div>
                      </div>
                      <div>
                        <div className="text-right mb-1">
                          <span className="text-sm font-medium">$16,942.00</span>
                          <span className="text-sm text-muted-foreground"> / </span>
                          <span className="text-sm text-muted-foreground">$48,240.00</span>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-blue-600"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
