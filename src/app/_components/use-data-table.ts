"use client";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  Table,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { z } from "zod";

export interface UseDataTableProps<TData>
  extends Pick<TableOptions<TData>, "columns" | "data" | "pageCount"> {
  search?: {
    searchKey?: string;
    placeholder: string;
  };
}

export interface UseDataTableReturn<TData> {
  table: Table<TData>;
  search?: {
    searchKey?: string;
    placeholder: string;
  };
}

export const searchParamsSchema = z.object({
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
});
type Sort<TData> =
  | `${Extract<keyof TData, string>}.${"asc" | "desc"}`
  | null
  | undefined;

export function useDataTable<TData>(
  props: UseDataTableProps<TData>
): UseDataTableReturn<TData> {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const fullURL = searchParamsSchema.parse(Object.fromEntries(searchParams));
  const page = fullURL.page ?? 1;
  const per_page = fullURL.per_page ?? 10;
  const sort = fullURL.sort as Sort<TData>;

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      console.log({ searchParams });
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  React.useEffect(() => {
    router.replace(`${path}?${createQueryString({ page, per_page })}`);
  }, []);
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: page - 1,
      pageSize: per_page,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  React.useEffect(() => {
    console.log(sorting, sorting[0]);
    if (sorting[0]) {
      router.push(
        `${path}?${createQueryString({
          page: pageIndex + 1,
          per_page: pageSize,
          sorting: `${sorting[0].id}.${sorting[0].desc ? "desc" : "asc"}`,
        })}`,
        {
          scroll: false,
        }
      );
    }
  }, [sorting]);

  React.useEffect(() => {
    router.push(
      `${path}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      {
        scroll: false,
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    ...props,
    state: {
      pagination,
      rowSelection,
      columnVisibility,
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });
  return { table, search: props.search };
}
