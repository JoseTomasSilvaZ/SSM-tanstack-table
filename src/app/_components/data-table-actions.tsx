import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import React from "react";

const NewTaskDialog = () => {
    
}


const DataTableHideColumns = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Hide columns <ChevronDownIcon className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table
          .getAllColumns()
          .filter((col) => col.getCanHide())
          .map((col) => {
            return (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={(value) => col.toggleVisibility(!!value)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DataTableActions = <TData,>({ table }: { table: Table<TData> }) => {
  return <DataTableHideColumns table={table} />;
};

export default DataTableActions;
