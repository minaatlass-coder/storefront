"use client";

interface OpenDetailsLinkProps {
  href: string;
  detailsId: string;
  className?: string;
  children: React.ReactNode;
}

export function OpenDetailsLink({
  href,
  detailsId,
  className = "",
  children,
}: OpenDetailsLinkProps) {
  function onClick() {
    const details = document.getElementById(detailsId) as HTMLDetailsElement | null;
    if (!details) return;
    details.open = true;
    requestAnimationFrame(() => {
      details.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
