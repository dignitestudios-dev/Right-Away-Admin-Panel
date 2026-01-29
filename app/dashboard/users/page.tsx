"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { getUsers } from "@/lib/api/adminUsers";
import { mapUsersForTable } from "@/lib/utils";

export default function UsersPage() {
  const [active, setActive] = useState<"users" | "rider">("users");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const role = active === "users" ? "user" : "rider";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers(role);
      setUsers(mapUsersForTable(data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [active]);

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
      </div>

      <DataTable users={users} role={role} loading={loading} />
    </div>
  );
}
