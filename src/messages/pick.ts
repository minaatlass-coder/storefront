/** Lit une clé à points dans un objet imbriqué (ex. `cart.title`). */
export function pickString(
  obj: Record<string, unknown>,
  path: string,
): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (typeof cur !== "object" || cur === null) return path;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : path;
}
