import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, UserPlus } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import { useGetSuggestionsQuery } from "@/backend/participant.api";
import { useAddMembersToEventMutation } from "@/backend/events-api";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AddMemberModal = ({ eventId }: { eventId: string }) => {
  const { data } = useGetSuggestionsQuery();
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [addMembers, { isLoading }] = useAddMembersToEventMutation();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const members: Member[] =
    data?.result?.members?.map(
      (member: { id: string; name: string; email: string }) => {
        const [firstName, ...lastNameParts] = member.name.split(" ");
        return {
          id: member.id,
          firstName: firstName || "",
          lastName: lastNameParts.join(" ") || "",
          email: member.email,
        };
      },
    ) || [];

  const availableMembers = members.filter(
    (member) => !selectedMembers.some((selected) => selected.id === member.id),
  );

  const handleSelectMember = (member: Member) => {
    setSelectedMembers((prev) => [...prev, member]);
  };

  const handleRemoveMember = (id: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMembers = async () => {
    if (selectedMembers.length === 0) {
      ErrorToast({
        title: "No members selected",
        description: "Please select at least one member.",
      });
      return;
    }

    try {
      const response = await addMembers({
        eventId,
        memberIds: selectedMembers.map((m) => m.id),
      }).unwrap();

      if (response.status === "success") {
        SuccessToast({ title: "Members added successfully" });
        setOpen(false);
        setSelectedMembers([]);
      } else {
        ErrorToast({
          title: response.message,
        });
      }
    } catch (error) {
      ErrorToast({
        title: "Failed to add members",
        description: "Please try again later.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer rounded-full bg-primary p-2 text-secondary">
          <UserPlus size={17} />
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border bg-white p-6 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Add Members to your event
          </DialogTitle>
        </DialogHeader>

        {/* Search and Select Members */}
        <Command className="rounded-xl border">
          <CommandInput placeholder="Search members..." />
          <CommandList>
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup heading="Available Members">
              {availableMembers.map((member) => (
                <CommandItem
                  key={member.id}
                  onSelect={() => handleSelectMember(member)}
                  className="flex cursor-pointer items-center gap-3 px-4 py-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {member.firstName[0]}
                      {member.lastName ? member.lastName[0] : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                    <p className="text-muted-foreground text-xs">
                      {member.email}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>

        {/* Selected Members */}
        {selectedMembers.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedMembers.map((member) => (
              <div
                key={member.id}
                className="group flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback>
                    {member.firstName[0]}
                    {member.lastName ? member.lastName[0] : ""}
                  </AvatarFallback>
                </Avatar>
                <span>{`${member.firstName} ${member.lastName}`}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X size={14} className="text-primary/60 hover:text-primary" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Members Button */}
        <Button
          onClick={handleAddMembers}
          className="mt-4 w-full bg-primary text-white"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Add Members"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
