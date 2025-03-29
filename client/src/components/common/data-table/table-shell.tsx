"use client";

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

type TableShellProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderToolbar?: (table: ReactTable<TData>) => React.ReactNode;
  addToolbar?: React.ReactNode;
};

export function TableShell<TData, TValue>({
  columns,
  data,
  renderToolbar,
  addToolbar,
}: TableShellProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

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
  });

  return (
    <div className="flex max-h-[800px] min-h-[650px] w-full flex-col justify-between p-6">
      {/* Top Toolbar */}
      <div className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
        {/* Search bar */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-[400px] bg-blue-100 focus:ring-2 focus:ring-primary focus:transition-all"
          />
          {addToolbar}
        </div>
        {/* Optional toolbar */}
        {renderToolbar && renderToolbar(table)}
      </div>

      {/* Table Content or Empty State */}
      {data.length ? (
        <div className="mb-4 flex-1 overflow-auto rounded-md">
          <Table>
            <TableHeader className="bg-primary text-secondary">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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

      {/* Pagination Controls */}
      {data.length > 0 && (
        <div className="flex items-center justify-end gap-2 pt-4">
          <div className="flex-1 text-sm text-dark">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-primary text-secondary"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-primary text-secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = "No Data Available",
  description = "Start by adding new data to manage efficiently.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-10 text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
};
