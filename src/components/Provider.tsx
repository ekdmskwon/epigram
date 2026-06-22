"use client";

import React from "react";
import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
