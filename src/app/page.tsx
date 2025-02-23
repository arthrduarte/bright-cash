import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Bright Cash</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button className="w-full">Add Income</Button>
            <Button className="w-full" variant="secondary">Add Expense</Button>
            <Button className="w-full" variant="outline">View Reports</Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <p className="text-muted-foreground">No transactions yet</p>
        </div>

        {/* Financial Goals */}
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Financial Goals</h2>
          <p className="text-muted-foreground">No goals set</p>
          <Button className="mt-4" variant="outline">Add Goal</Button>
        </div>
      </div>
    </div>
  )
}
