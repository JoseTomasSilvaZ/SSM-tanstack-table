"use client";

import {
  TableBody,
  Table as TableC,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import React from "react";
import { TableSearch } from "./table-search";
import { TablePagination } from "./table-pagination";

export function ServerTable<TData>({
  table,
  search,
  children,
}: {
  table: Table<TData>;
  search?: { searchKey?: string; placeholder: string };
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row justify-between items-center">
        <TableSearch
          searchKey={search?.searchKey}
          placeholder={search?.placeholder}
        />
        {children}
      </div>
      {table && (
        <div className="rounded-md border">
          <TableC>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <TableHead key={column.id}>
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getCoreRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableC>
        </div>
      )}
      <TablePagination table={table} />
    </div>
  );
}
