import "./globals.css";
import type { Metadata } from "next";
import { buildThemeCssVars } from "@/theme/cssVars";

export const metadata: Metadata = {
  title: "Saravafy",
  description:
    "Preservar, registrar e compartilhar pontos com respeito e responsabilidade.",
};

const lightVars = buildThemeCssVars("light");
const darkVars = buildThemeCssVars("dark");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <head>
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
:root {
${lightVars}
}
html[data-theme="dark"] {
${darkVars}
}
`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
