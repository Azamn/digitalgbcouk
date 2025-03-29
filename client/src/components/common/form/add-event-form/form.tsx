"use client";
import { Building2, CalendarClock, FileText, Type } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/store";
import { createEventSchema, CreateEventType } from "@/schema";
import DateTimePicker from "@/components/date-time-picker";
import FormField from "@/components/ui/form-field";
import { useCreateEventMutation } from "@/store/api-endpoints/events-api";
import Spinner from "@/components/ui/spinner";
import { useAppToasts } from "@/hooks/use-app-toast";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

export function CreateEvent({
  onSuccess,
  clientId,
}: {
  onSuccess: () => void;
  clientId: string;
}) {
  console.log("🚀 ~ clientId:", clientId)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      additional: "",
      startTime: "",
      endTime: "",
    },
  });
  const { SuccessToast, ErrorToast } = useAppToasts();
  const [CreateEvent, { isLoading }] = useCreateEventMutation();

  const onSubmit = async (event: CreateEventType) => {
    try {
      const resp = await CreateEvent({ event, clientId }).unwrap();
      if (resp.status === "success") {
        SuccessToast({
          title: "Event Created Successfully",
        });
        onSuccess();
      }
    } catch (error) {
      ErrorToast({
        title: "Error Creating Event",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">
      <div className="space-y-4">
        {/* Event Title */}
        <FormField label="Event Title">
          <Type className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
          <Input
            {...register("title")}
            placeholder="Annual Tech Conference 2024"
            className={cn(
              "rounded-lg border-2 border-primary/40 bg-white pl-10 text-primary placeholder:text-primary/40 focus:border-primary focus:ring-primary/50",
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </FormField>

        {/* Description */}
        <FormField label="Description">
          <FileText className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
          <Textarea
            {...register("description")}
            placeholder="Describe your event..."
            className={cn(
              "min-h-[100px] rounded-lg border-2 border-primary/40 bg-white pl-10 text-primary placeholder:text-primary/40 focus:border-primary focus:ring-primary/50",
            )}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">
              {errors.description.message}
            </p>
          )}
        </FormField>

        {/* Additional Info */}
        <FormField label="Additional Information">
          <Building2 className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
          <Textarea
            {...register("additional")}
            placeholder="Additional information about the event..."
            className={cn(
              "min-h-[100px] rounded-lg border-2 border-primary/40 bg-white pl-10 text-primary placeholder:text-primary/40 focus:border-primary focus:ring-primary/50",
            )}
          />
          {errors.additional && (
            <p className="mt-1 text-sm text-red-400">
              {errors.additional.message}
            </p>
          )}
        </FormField>

        {/* Start and End Times */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Start Time">
            <Controller
              control={control}
              name="startTime"
              render={({ field }) => (
                <DateTimePicker
                  onChange={(datetime) =>
                    field.onChange(datetime.toISOString())
                  }
                />
              )}
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-400">
                {errors.startTime.message}
              </p>
            )}
          </FormField>

          <FormField label="End Time">
            <Controller
              control={control}
              name="endTime"
              render={({ field }) => (
                <DateTimePicker
                  onChange={(datetime) =>
                    field.onChange(datetime.toISOString())
                  }
                />
              )}
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-400">
                {errors.endTime.message}
              </p>
            )}
          </FormField>
        </div>
      </div>

      <SheetFooter className="flex justify-end gap-4 pt-6">
        <SheetClose asChild>
          <Button className="rounded-md w-[140px] bg-red-400 px-6 py-2 text-primary">
            Cancel
          </Button>
        </SheetClose>

        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-md w-[140px] bg-green-400 px-6 py-2 text-primary"
        >
          {!isLoading ? <Spinner /> : "Create Event"}
        </Button>
      </SheetFooter>
    </form>
  );
}
