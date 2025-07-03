import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="flex bg-gray-100 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-col items-center"></CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
