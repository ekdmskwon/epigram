import { AuthProvider } from "@/contexts/AuthContext";
import EpigramDetailShell from "./_components/EpigramDetailShell";

export default function EpigramDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <EpigramDetailShell>{children}</EpigramDetailShell>
    </AuthProvider>
  );
}
