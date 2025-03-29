import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
const FormField = ({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("space-y-2", className)}>
    <Label className="text-sm text-main/90 font-medium">{label} :</Label>
    <div className="relative">
      {children}
      {error && (
        <div className="absolute text-sky-950 right-0 top-1/2 mr-3 -translate-y-1/2">
          <AlertCircle className="h-4 w-4 text-red-400" />
        </div>
      )}
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-[13px] text-red-400">
        {error}
      </p>
    )}
  </div>
);

export default FormField;