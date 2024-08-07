import { Task } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const HideColumnsToggle = <TData,>({ table }: { table: Table<Task> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Hide columns <ChevronDownIcon className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table
          .getAllColumns()
          .filter((col) => col.getCanHide())
          .map((column) => (
            <DropdownMenuItem
              key={column.id}
              className="flex items-center capitalize"
            >
              {column.id}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HideColumnsToggle;
