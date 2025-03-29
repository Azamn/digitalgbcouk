import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { Building2, CalendarClock, FileText, Instagram } from "lucide-react";
import FormField from "@/components/ui/form-field";
import DateTimePicker from "@/components/date-time-picker";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useEditEventMutation } from "@/server-api/events-api";

export interface EditEventFormData {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description: string;
  additional: string;
}

interface EventEditSheetProps {
  event: EditEventFormData;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export function EventEditSheet({
  event,
  isOpen,
  onClose,
}: EventEditSheetProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditEventFormData>({
    defaultValues: event,
  });

  const { ErrorToast, SuccessToast } = useAppToasts();
  const [editEvent, { isLoading }] = useEditEventMutation();

  const handleFormSubmit = async (data: EditEventFormData) => {
    try {
      const response = await editEvent({
        id: event.id,
        title: data.title,
        description: data.description,
        additional: data.additional,
        startTime: data.startTime,
        endTime: data.endTime,
      }).unwrap();

      if (response.status === "success") {
        SuccessToast({ title: response.message });
        onClose(false);
      } else {
        ErrorToast({ title: response.message });
      }
    } catch (error) {
      ErrorToast({ title: "Failed to edit event" });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="h-full !w-[600px] min-w-[600px] bg-white"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-primary">
            Edit Event
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-8 space-y-6 overflow-y-auto pb-20"
        >
          <FormField label="Event Title">
            <Input
              {...register("title")}
              className="border-primary bg-secondary pl-10"
            />
            <CalendarClock className="absolute left-3 top-3 h-5 w-5 text-primary" />
          </FormField>

          <div className="flex flex-1 items-center justify-between gap-x-5">
            <FormField label="Start Time" className="flex-1">
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                  <DateTimePicker
                    date={event.startTime}
                    onChange={(datetime) => field.onChange(datetime)}
                  />
                )}
              />
              {errors.startTime && (
                <p className="text-sm text-red-400">
                  {errors.startTime.message}
                </p>
              )}
            </FormField>

            <FormField label="End Time" className="flex-1">
              <Controller
                control={control}
                name="endTime"
                render={({ field }) => (
                  <DateTimePicker
                    date={event.endTime}
                    onChange={(datetime) => field.onChange(datetime)}
                  />
                )}
              />
              {errors.endTime && (
                <p className="text-sm text-red-400">{errors.endTime.message}</p>
              )}
            </FormField>
          </div>

          <FormField label="Description">
            <FileText className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <Textarea
              {...register("description")}
              className="min-h-[80px] border-primary bg-secondary pl-10"
            />
          </FormField>

          <FormField label="Additional">
            <Building2 className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <Textarea
              {...register("additional")}
              className="min-h-[80px] border-primary bg-secondary pl-10"
            />
          </FormField>

          <SheetFooter className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-red-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-secondary hover:bg-opacity-80"
            >
              {isLoading ? <Spinner /> : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
