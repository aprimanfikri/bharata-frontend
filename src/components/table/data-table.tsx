"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableMeta,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "../custom-dialog";
import { TransactionForm } from "../form/transaction-form";
import { useState } from "react";

interface DataTableMeta<TData extends object> {
  session: Session;
  dateField?: keyof TData;
}

interface DataTableProps<TData extends object, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  type: "product" | "rack" | "transaction";
  racks?: Rack[];
  session: Session;
}

export function DataTable<TData extends object, TValue>({
  columns,
  data,
  session,
  type,
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      session: session,
    } as TableMeta<TData> & DataTableMeta<TData>,
  });

  return (
    <div className="space-y-4">
      {type === "product" && (
        <>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <Plus />
            Add Transaction
          </Button>
          <CustomDialog
            open={open}
            onOpenChange={(open) => setOpen(open)}
            hideCloseButton={true}
          >
            <TransactionForm
              onCloseDialog={() => {
                setOpen(false);
              }}
              session={session}
              products={data as Product[]}
            />
          </CustomDialog>
        </>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
