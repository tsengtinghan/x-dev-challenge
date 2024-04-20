export default function ConsoleLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="m-5">
        {children}
      </section>
    )
  }