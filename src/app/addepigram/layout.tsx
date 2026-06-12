import { AuthProvider } from "@/contexts/AuthContext";
import AddEpigramShell from "./_components/AddEpigramShell";

export default function AddEpigramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AddEpigramShell>{children}</AddEpigramShell>
    </AuthProvider>
  );
}
