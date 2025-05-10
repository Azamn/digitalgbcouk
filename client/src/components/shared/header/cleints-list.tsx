"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setView } from "@/store/states";
import { useGetallClientsQuery } from "@/backend/participant.api";
import { Instagram } from "lucide-react";
import useAuth from "@/hooks/use-auth";

const ClientsList = () => {
  const router = useRouter();
  const { data } = useGetallClientsQuery();
  const CLIENTS = data?.result || [];
  const USER = useAuth();

  const handleChange = (clientId: string) => {
    if (!USER?.id) return;
    router.push(`/admin/${USER.id}/workspace?clientId=${clientId}`);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="border-0 shadow-none focus:border-none">
        <SelectValue placeholder="Select a client" />
      </SelectTrigger>
      <SelectContent>
        {CLIENTS.map(({ id, user }) => (
          <SelectItem className="border-0" key={id} value={id}>
            <span className="flex items-center gap-x-1 font-lexend">
              <Instagram size={16} className="text-pink-500" />
              {user.userName}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClientsList;
