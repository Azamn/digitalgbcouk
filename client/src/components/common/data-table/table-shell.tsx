import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  RowSelectionState,
  flexRender,
  Table as ReactTable,
} from "@tanstack/react-table";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TableShellProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderToolbar?: (table: ReactTable<TData>) => React.ReactNode;
  addToolbar?: React.ReactNode;
  title?: string;
  description?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
};

export function TableShell<TData, TValue>({
  columns,
  data,
  addToolbar,
  isLoading = false,
  onRefresh,
}: TableShellProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className="flex max-h-[800px] min-h-[600px] w-full flex-col rounded-xl bg-white">
      {/* Controls Section */}
      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          {/* Left Side Controls */}
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search across all columns..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9 pr-4"
              />
            </div>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="gap-2 bg-success"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="bg-purple gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] bg-white">
                {table.getAllColumns().map((column) => {
                  if (!column.getCanHide()) return null;
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={(e) =>
                            column.toggleVisibility(e.target.checked)
                          }
                        />
                        {column.id}
                      </label>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            {addToolbar}
          </div>
        </div>
        {/* {renderToolbar && renderToolbar(table)} */}
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto px-6">
        {data.length > 0 ? (
          <div className="rounded-lg border border-gray-100">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-gradient-to-r from-blue-100 to-purple hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-sm font-semibold text-gray-700"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row, i) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={` ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-blue-50 ${row.getIsSelected() ? "bg-blue-100 hover:bg-blue-200" : ""} `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Footer Section */}
      <div className="border-t border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="text-gray-600">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="gap-1"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Page</span>
              <strong className="text-sm">
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="gap-1"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <div className="rounded-full bg-gray-100 p-3">
        <Search className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        No content found
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        Get started by creating your first social media content piece.
      </p>
    </div>
  );
};
