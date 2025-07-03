import { productColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getSession } from "@/lib/actions/auth";
import { getProductAction } from "@/lib/actions/product";
import { sanitizeSession } from "@/lib/utils";
import { redirect } from "next/navigation";

const ProductPage = async () => {
  const session = await getSession();

  const safeSession = sanitizeSession(session);

  if (!safeSession.token) {
    redirect("/login");
  }

  const data = await getProductAction(safeSession.token);

  return (
    <DataTable
      columns={productColumns}
      data={data}
      session={safeSession}
      type="product"
    />
  );
};

export default ProductPage;
