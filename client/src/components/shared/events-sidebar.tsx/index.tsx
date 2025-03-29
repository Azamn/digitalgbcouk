// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { OrganizationSwitcher } from "./organization-switcher";
// import { Organizations } from "@/store/types/api";
// import { useState } from "react";
// import { EventList } from "./events-list";
// import { User } from "./user";
// import { Plus, Table2Icon } from "lucide-react";

// export function EventsSidebar({
//   orgList,
//   userId,
// }: {
//   orgList: Organizations[];
//   userId: string;
// }) {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const currentOrg = orgList[selectedIndex];

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           variant={"outline"}
//           className="bg-primary text-secondary flex items-center gap-2 rounded-lg p-2"
//         >
//           <Table2Icon />
//         </Button>
//       </SheetTrigger>

//       {orgList.length > 0 && (
//         <SheetContent className="mr-2 rounded-2xl border-2 border-primary bg-secondary">
//           <SheetHeader>
//             <SheetTitle className="hidden" />
//           </SheetHeader>
//           <OrganizationSwitcher
//             Organizations={orgList}
//             setSelectedIndex={setSelectedIndex}
//           />
//           <EventList userId={userId} events={currentOrg?.events ?? []} />
//           <User />
//         </SheetContent>
//       )}
//     </Sheet>
//   );
// }

// export default EventsSidebar;
