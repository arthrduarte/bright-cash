import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TransactionForm from "./transaction-form";

export default function TransactionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
}
