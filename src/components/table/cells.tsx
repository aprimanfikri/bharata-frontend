"use client";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
import CustomDialog from "../custom-dialog";
import { DataTable } from "./data-table";
import { transactionColumns } from "./columns";
import { Button } from "../ui/button";

export const ProductCell = ({
  row,
  session,
}: {
  row: Row<Product>;
  session: Session;
}) => {
  const [view, setView] = useState<boolean>(false);

  const product = row.original;

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="link"
        className="text-blue-600 cursor-pointer"
        onClick={() => setView(true)}
      >
        View
      </Button>
      <CustomDialog
        onOpenChange={(open) => setView(open)}
        open={view}
        hideCloseButton={true}
      >
        <DataTable
          columns={transactionColumns}
          data={product.transactions}
          type="transaction"
          session={session}
        />
      </CustomDialog>
    </div>
  );
};
