import { ReactNode } from "react";


type SectionShellProps = {
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export function SectionShell({
  children,
  className,
  muted = false,
}: SectionShellProps) {
  return (
   <section className={`${muted ? "bg-slate-50" : "bg-white"} ${className || ""}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16 lg:py-20">
        {children}
      </div>
    </section>
  );
}