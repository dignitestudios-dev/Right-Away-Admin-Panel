"use client"

import { useState } from "react"
import { StatCards } from "./components/stat-cards"
import { DataTable } from "./components/data-table"

import initialUsersData from "./data.json"
import { Button } from "@/components/ui/button"

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  plan: string
  billing: string
  status: string
  joinedDate: string
  lastLogin: string
}



export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsersData)

  const generateAvatar = (name: string) => {
    const names = name.split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

 

  

  const [active, setActive] = useState<"users" | "rider">("users");

  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold p">Users List</h1>
        <div className="w-full flex gap-2">
      <Button className="w-[20vh]"
        variant={active === "users" ? "default" : "outline"}
        onClick={() => setActive("users")}
      >
        Users
      </Button>

      <Button className="w-[20vh]"
        variant={active === "rider" ? "default" : "outline"}
        onClick={() => setActive("rider")}
      >
        Rider
      </Button>
    </div>
      <div className="@container/main px-4 lg:px-6 mt-2">
     {active === "users" ? (
  <DataTable 
    users={users}   
  />
) : active === "rider" ? (
  <DataTable 
    users={users}  
  />
) : null}
    
      </div>
    </div>
  )
}
