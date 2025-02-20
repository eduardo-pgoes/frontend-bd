"use client";

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Provê o tema claro / escuro para a aplicação.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
