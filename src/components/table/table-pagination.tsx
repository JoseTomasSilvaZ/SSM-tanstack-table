import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Table } from "@tanstack/react-table";

export function TablePagination<TData>({ table }: { table: Table<TData> }) {
  const pageSizes = [10, 25, 50, 100];
  return (
    <div className="flex mt-3 w-full flex-col-reverse justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8 ">
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
