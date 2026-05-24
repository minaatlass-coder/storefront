import { site } from "@/data/site";

/** Même pictogramme sur /fr et /ar (à côté du nom de marque). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={site.logoMark}
      alt=""
      width={40}
      height={40}
      decoding="async"
      className={className}
      aria-hidden
    />
  );
}
