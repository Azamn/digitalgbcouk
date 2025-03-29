import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary text-secondary">
      <div className="flex max-w-md flex-col items-center justify-center space-y-6 rounded-2xl border border-secondary p-10 shadow-lg">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
          <ShieldAlert className="h-12 w-12 text-secondary" />
        </div>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold">Unauthorized Access</h1>

        {/* Subtext */}
        <p className="text-center text-secondary/80">
          You don't have permission to view this page. Please return to the homepage or contact support if you believe this is a mistake.
        </p>

        {/* Go Home Button */}
        <Link href="/">
          <Button className="rounded-lg border border-secondary bg-secondary px-6 py-2 text-primary transition hover:bg-secondary/80">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
