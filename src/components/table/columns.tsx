"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductCell } from "./cells";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const rackColumns: ColumnDef<Rack>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <div>{row.original.products.length || 0}</div>,
  },
];

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => (
      <Badge
        className={
          row.original.stock === 0
            ? "bg-red-500 text-white"
            : row.original.stock <= 10
            ? "bg-yellow-500 text-black"
            : "bg-green-500 text-white"
        }
      >
        {row.original.stock === 0
          ? "Out of stock"
          : row.original.stock <= 10
          ? "Low stock"
          : "In stock"}
      </Badge>
    ),
  },
  {
    accessorKey: "rack",
    header: "Rack",
    cell: ({ row }) => <div>{row.original.rack?.name || "-"}</div>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row, table }) => (
      <ProductCell
        row={row}
        session={(table.options.meta as { session: Session }).session}
      />
    ),
  },
];

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{format(row.original.date, "MMM dd, yyyy")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.original.type}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>{row.original.amount}</div>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <div>{row.original.user?.username || "-"}</div>,
  },
];
