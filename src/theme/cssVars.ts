import { colors } from "@saravafy/design-tokens";

type Mode = "light" | "dark";

/**
 * Gera um bloco de CSS variables a partir dos tokens.
 * Mantém o web idiomático: tudo via CSS vars.
 */
export function buildThemeCssVars(mode: Mode): string {
  // Ajuste aqui conforme o shape real do seu colors.ts:
  // Se você tem `colors.light` e `colors.dark`, perfeito.
  // Se ainda não tem, a gente adapta depois.
  const palette: Record<string, string> =
    (colors as any)[mode] ?? (colors as any);

  const lines: string[] = [];
  for (const [key, value] of Object.entries(palette)) {
    if (typeof value !== "string") continue;
    lines.push(`  --saravafy-${key}: ${value};`);
  }
  return lines.join("\n");
}
