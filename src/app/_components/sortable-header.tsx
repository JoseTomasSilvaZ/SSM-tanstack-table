"use clie t";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Column, Row } from "@tanstack/react-table";
import React from "react";

const SortableHeader = <TData,>({
  column,
  title,
  canHide = true,
}: {
  column: Column<TData>;
  title: string;
  canHide?: boolean;
}) => {
  const icon =
    column.getIsSorted() === "desc" ? (
      <ArrowDownIcon className="size-[13px] ml-1" />
    ) : (
      <ArrowUpIcon className="size-[13px] ml-1" />
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {title} {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUpIcon className="size-[13px] mr-1" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDownIcon className="size-[13px] mr-1" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortableHeader;
