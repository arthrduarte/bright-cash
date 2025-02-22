import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import DashboardStats from "@/components/dashboard-stats";
import DashboardChart from "@/components/dashboard-chart";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
        </div>
        <Skeleton className="h-[400px] mt-4" />
      </div>
    );
  }

  return (
    <div>
      <DashboardStats transactions={transactions || []} />
      <DashboardChart transactions={transactions || []} />
    </div>
  );
}
