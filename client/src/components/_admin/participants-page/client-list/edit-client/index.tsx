// components/EditClientModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditClientForm from "./form";
import { EditClientType } from "./schema";

type EditClientModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: EditClientType;
  onSuccess: () => void;
};

export default function EditClientModal({
  open,
  onOpenChange,
  defaultValues,
  onSuccess,
}: EditClientModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <EditClientForm
          defaultValues={defaultValues}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
