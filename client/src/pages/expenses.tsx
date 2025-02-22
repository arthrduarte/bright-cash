import DashboardChart from "@/components/dashboard-chart";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Expenses() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  if (isLoading) {
    return <Skeleton className="h-[400px]" />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Expenses by Category</h1>
      <DashboardChart transactions={transactions || []} />
    </div>
  );
}
