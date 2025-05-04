import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditMemberForm from "./form";
import { EditMemberType } from "./schema";

type EditClientModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: EditMemberType;
  onSuccess: () => void;
};

export default function EditMemberModal({
  open,
  onOpenChange,
  defaultValues,
  onSuccess,
}: EditClientModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>
        <EditMemberForm
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
