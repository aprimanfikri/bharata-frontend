"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LogoutComponentProps {
  setShowLogoutDialog: (show: boolean) => void;
}

const LogoutComponent = ({ setShowLogoutDialog }: LogoutComponentProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      const response = await logoutAction();

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.replace("/login");
      }
    });
  };

  return (
    <div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Logout</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to log out?
        </p>
      </div>

      <div className="flex justify-end gap-4 p-4">
        <Button
          className="bg-white hover:bg-slate-100 text-black border cursor-pointer"
          onClick={() => setShowLogoutDialog(false)}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={handleLogout}
          disabled={isPending}
          variant="destructive"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutComponent;
