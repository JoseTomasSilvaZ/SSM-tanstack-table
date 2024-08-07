"use client";
import HideColumnsToggle from "@/components/table/hide-columns";
import { ServerTable } from "@/components/table/server-table";
import SortableHeader from "@/components/table/sortable-header";
import { Badge } from "@/components/ui/badge";
import { useServerTable } from "@/hooks/use-server-table";
import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

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
      return <span className="font-normal ">{row.original.title}</span>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortableHeader column={column} title="description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {row.original.description}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableHeader column={column} canHide={false} title="xd" />;
    },
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.status}</Badge>;
    },
  },
];

const TasksTable = ({
  data,
  pageCount,
}: {
  data: Task[];
  pageCount: number;
}) => {
  const { table, search } = useServerTable({
    columns,
    data,
    pageCount,
    search: { placeholder: "Search by title...", searchKey: "title" },
  });
  return (
    <ServerTable table={table} search={search}>
      <HideColumnsToggle table={table} />
    </ServerTable>
  );
};

export default TasksTable;
