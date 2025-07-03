import { rackColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getSession } from "@/lib/actions/auth";
import { getRackAction } from "@/lib/actions/rack";
import { sanitizeSession } from "@/lib/utils";
import { redirect } from "next/navigation";

const RackPage = async () => {
  const session = await getSession();

  const safeSession = sanitizeSession(session);

  if (!safeSession.token) {
    redirect("/login");
  }

  const data = await getRackAction(safeSession.token);

  return (
    <DataTable
      columns={rackColumns}
      data={data}
      session={safeSession}
      type="rack"
    />
  );
};

export default RackPage;
