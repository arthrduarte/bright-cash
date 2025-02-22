import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Transaction } from "@shared/schema";
import TransactionForm from "./transaction-form";

interface DuplicateTransactionDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DuplicateTransactionDialog({
  transaction,
  open,
  onOpenChange,
}: DuplicateTransactionDialogProps) {
  if (!transaction || !open) {
    return null;
  }

  // Create a copy of the transaction without the ID
  const transactionCopy = {
    type: transaction.type,
    accountType: transaction.accountType,
    category: transaction.category,
    amount: transaction.amount,
    description: transaction.description,
    date: new Date(),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Duplicate Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm 
          transaction={transactionCopy} 
          onSuccess={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
} 