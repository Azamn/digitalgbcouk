import * as Tooltip from "@radix-ui/react-tooltip";
import { CheckCircle } from "lucide-react";

const ConfirmButton = ({
  confirmed,
  onConfirm,
}: {
  confirmed: boolean;
  onConfirm: () => void;
}) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={onConfirm}
            className={`flex items-center gap-2 rounded p-2 transition-all ${
              confirmed ? "bg-green-600" : "bg-primary"
            }`}
          >
            <CheckCircle
              className={`h-5 w-5 transition-colors ${
                confirmed ? "text-green-300" : "text-secondary"
              }`}
            />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            className="select-none rounded bg-gray-800 px-3 py-1.5 text-xs text-white shadow-sm"
          >
            {confirmed ? "Confirmed" : "Click to Confirm"}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ConfirmButton;
