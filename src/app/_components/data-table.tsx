"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TableBody,
  Table as TableC,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { flexRender, Table, TableOptions } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export function DataTableSearch({
  searchKey = "search",
  placeholder,
}: {
  searchKey: string;
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const onSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === null || value === "") {
      params.delete(searchKey);
    } else {
      params.set(searchKey, value);
    }

    router.push(`${path}/?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      className="h-8 w-36 lg:w-64"
    />
  );
}

export function DataTablePagination<TData>({ table }: { table: Table<TData> }) {
  const pageSizes = [10, 25, 50, 100];
  return (
    <div className="flex mt-3 w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8 ">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table?.getFilteredSelectedRowModel().rows.length} of{" "}
        {table?.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${table?.getState().pagination.pageSize}`}
            onValueChange={(value) => table?.setPageSize(+value)}
          >
            <SelectTrigger className="h-8 w-fit">
              <SelectValue
                placeholder={table?.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={`pagesize-item-${size}`} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table?.getState().pagination.pageIndex + 1} of{" "}
          {table?.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table?.setPageIndex(0)}
            disabled={!table?.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table?.previousPage()}
            disabled={!table?.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table?.nextPage()}
            disabled={!table?.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table?.setPageIndex(table?.getPageCount() - 1)}
            disabled={!table?.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DataTable<TData>({
  table,
  search,
  children,
}: {
  table?: Table<TData>;
  search?: { searchKey?: string; placeholder: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-4 flex flex-rpw justify-between items-center">
        <DataTableSearch
          searchKey={search?.searchKey ?? "PLEASE_PROVIDE_A_SEARCH_KEY"}
          placeholder={search?.placeholder ?? "Please provide a placeholder"}
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
      <DataTablePagination table={table} />
    </>
  );
}
