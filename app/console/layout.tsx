import { Suspense } from "react";
export default function ConsoleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="dark">{children}</section>
    </Suspense>
  );
}
