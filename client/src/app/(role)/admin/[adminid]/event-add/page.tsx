"use client";

import { Building2, CalendarClock, FileText, Type } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEventSchema, CreateEventType } from "@/schema";
import DateTimePicker from "@/components/date-time-picker";
import FormField from "@/components/ui/form-field";
import Spinner from "@/components/ui/spinner";
import { useAppToasts } from "@/hooks/use-app-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useGetSuggestionsQuery } from "@/backend/participant.api";
import { useCreateEventMutation } from "@/backend/events-api";

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
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

  const { data } = useGetSuggestionsQuery();
  const { SuccessToast, ErrorToast } = useAppToasts();
  const [CreateEvent, { isLoading }] = useCreateEventMutation();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const onSubmit = async (event: CreateEventType) => {
    if (!selectedClient) {
      ErrorToast({ title: "Please select a client" });
      return;
    }
    try {
      const resp = await CreateEvent({
        event,
        clientId: selectedClient,
      }).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: "Event Created Successfully" });
      }
      reset();
    } catch (error) {
      ErrorToast({ title: "Error Creating Event" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-[650px] space-y-6 rounded-2xl bg-white p-8 border-purple-950 border"
    >
      {/* Header Section */}
      <div className="flex items-center justify-center border-b pb-4">
        <h2 className="text-center text-2xl font-bold uppercase text-dark">
          Add Events For Clients
        </h2>
      </div>

      <div className="space-y-6">
        {/* Select Client & Event Title */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField label="Select Client">
            <Select onValueChange={setSelectedClient}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent className="bg-dark text-secondary">
                <SelectGroup>
                  <SelectLabel>Clients</SelectLabel>
                  {data?.result.clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Event Title">
            <div className="relative">
              <Type className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
              <Input
                {...register("title")}
                placeholder="Annual Tech"
                className="w-full rounded-lg border border-dark/30 bg-white pl-10 text-dark shadow-sm"
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </FormField>
        </div>

        {/* Description & Additional */}
        <div className="space-y-4">
          <FormField label="Description">
            <div className="relative">
              <FileText className="text-muted-foreground absolute left-3 top-4 h-5 w-5" />
              <Textarea
                {...register("description")}
                placeholder="Describe your event..."
                className="min-h-[120px] w-full rounded-lg border border-dark/30 bg-white pl-10 pt-3 text-dark shadow-sm"
              />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </FormField>

          <FormField label="Additional">
            <div className="relative">
              <FileText className="text-muted-foreground absolute left-3 top-4 h-5 w-5" />
              <Textarea
                {...register("additional")}
                placeholder="Describe additional details..."
                className="min-h-[120px] w-full rounded-lg border border-dark/30 bg-white pl-10 pt-3 text-dark shadow-sm"
              />
            </div>
            {errors.additional && (
              <p className="mt-1 text-sm text-red-400">
                {errors.additional.message}
              </p>
            )}
          </FormField>
        </div>

        {/* Start & End Time */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          type="button"
          className="w-[140px] rounded-lg border bg-red-500 text-white hover:bg-red-600"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-[140px] rounded-lg bg-dark text-white hover:bg-black"
        >
          {isLoading ? <Spinner /> : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEvent;
