import { AuthProvider } from "@/contexts/AuthContext";
import EpigramListShell from "./_components/EpigramListShell";

export default function EpigramListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <EpigramListShell>{children}</EpigramListShell>
    </AuthProvider>
  );
}
