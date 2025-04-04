"use client";

import * as React from "react";
import { ChevronsUpDown, TableCellsMerge } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { Organizations } from "@/backend/types/api";
import { useAppDispatch } from "@/store";
import { setOrgId } from "@/store/states";

interface OrganizationSwitcherProps {
  setSelectedIndex: (selectedIndex: number) => void;
  Organizations: Organizations[];
}

export const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = ({
  setSelectedIndex,
  Organizations,
}) => {
  const [activeTeamIndex, setActiveTeamIndex] = React.useState<number>(0);
  const activeTeam = Organizations[activeTeamIndex];
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (Organizations.length > 0) {
      const initialOrgId = Organizations[0]?.id;
      if (initialOrgId) {
        dispatch(setOrgId(initialOrgId));
      }
      setSelectedIndex(0);
    }
  }, [Organizations, dispatch, setSelectedIndex]);

  const handleTeamChange = (index: number, id: string) => {
    setActiveTeamIndex(index);
    setSelectedIndex(index);
    dispatch(setOrgId(id ?? Organizations[activeTeamIndex]?.id));
  };

  return (
    <div className="flex w-full flex-col items-start rounded-xl border-2 border-dashed border-primary bg-main/30 p-2 font-lexend shadow-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="flex w-full items-center justify-between gap-2 border-none px-4 py-3 text-left shadow-none outline-none transition duration-200 ease-in-out"
          >
            <div className="flex items-center gap-2">
              <div className="bg-muted flex aspect-square w-12 items-center justify-center rounded-full">
                {activeTeam?.imageUrl ? (
                  <img
                    src={activeTeam.imageUrl}
                    alt={activeTeam.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-lg font-medium uppercase text-secondary">
                    {activeTeam?.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="truncate text-sm font-semibold uppercase text-primary">
                  {activeTeam?.name || "Select Team"} ORGANIZATION
                </span>
                <span className="truncate text-sm font-normal text-gray-600">
                  @{activeTeam?.slug || ""}
                </span>
              </div>
            </div>

            <ChevronsUpDown className="h-6 w-6 transform text-gray-500 transition-transform" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="mt-2 min-w-56 rounded-xl border-2 border-primary bg-secondary p-3 shadow-lg"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <DropdownMenuLabel className="flex items-center gap-x-1 px-4 py-2 text-sm font-medium text-primary">
            <TableCellsMerge /> ORGANIZATIONS
          </DropdownMenuLabel>

          {Organizations.map((Organization, index) => (
            <DropdownMenuItem
              key={Organization.id}
              onClick={() => handleTeamChange(index, Organization.id)}
              className="my-2 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-primary font-lexend transition duration-200 ease-in-out hover:bg-gray-100"
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200">
                {Organization.imageUrl ? (
                  <img
                    src={Organization.imageUrl}
                    alt={Organization.name.charAt(0).toUpperCase()}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-lg font-medium uppercase text-gray-600">
                    {Organization.name?.charAt(0)}
                  </div>
                )}
              </div>
              <span className="capitalize text-gray-900">
                {Organization.name} Organization
              </span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator className="my-2" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
