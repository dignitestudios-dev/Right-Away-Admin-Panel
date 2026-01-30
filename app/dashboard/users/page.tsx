"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { getUsers } from "@/lib/api/adminUsers";
import { mapUsersForTable } from "@/lib/utils";

export default function UsersPage() {
  const [active, setActive] = useState<"users" | "rider" | "company">("users");

  const role: "user" | "rider" | "company" =
    active === "users" ? "user" : active === "rider" ? "rider" : "company";

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Users Management</h1>

      <div className="flex gap-2">
        <Button
          variant={active === "users" ? "default" : "outline"}
          onClick={() => setActive("users")}
        >
          Users
        </Button>

        <Button
          variant={active === "rider" ? "default" : "outline"}
          onClick={() => setActive("rider")}
        >
          Riders
        </Button>

        <Button
          variant={active === "company" ? "default" : "outline"}
          onClick={() => setActive("company")}
        >
          Companies
        </Button>
      </div>

      <DataTable role={role} />
    </div>
  );
}
