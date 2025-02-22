import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">FinTrack</h1>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">
                  <a className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    location === "/" ? "bg-primary/10 text-primary" : "text-foreground/60 hover:text-foreground"
                  )}>
                    Dashboard
                  </a>
                </Link>
                <Link href="/transactions">
                  <a className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    location === "/transactions" ? "bg-primary/10 text-primary" : "text-foreground/60 hover:text-foreground"
                  )}>
                    Transactions
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
