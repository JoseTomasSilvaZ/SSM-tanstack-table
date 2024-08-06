"use client";
import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useDataTable } from "../_components/use-data-table";
import { DataTable } from "../_components/data-table";
import { Button } from "@/components/ui/button";
import SortableHeader from "../_components/sortable-header";
import DataTableActions from "../_components/data-table-actions";
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
    header: ({ column }) => (
      <SortableHeader column={column} title="description" />
    ),
    cell: ({ row }) => {
      return <span>{row.original.description}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableHeader column={column} canHide={false} title="xd" />;
    },
  },
];
const Glue = ({ data, pageCount }: { data: Task[]; pageCount: number }) => {
  const { table, search } = useDataTable<Task>({ columns, data, pageCount });
  return (
    <DataTable table={table} search={search}>
      <DataTableActions table={table} />
    </DataTable>
  );
};

export default Glue;
