"use client";
import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useDataTable } from "../_components/use-data-table";
import { DataTable } from "../_components/data-table";
import { Button } from "@/components/ui/button";
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <span>{row.id}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <span>{row.original.title}</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <span>{row.original.description}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Toggle sorting status
        </Button>
      );
    },
  },
];
const Glue = ({ data, pageCount }: { data: Task[]; pageCount: number }) => {
  const { table, search } = useDataTable<Task>({ columns, data, pageCount });
  return <DataTable table={table} search={search} />;
};

export default Glue;
