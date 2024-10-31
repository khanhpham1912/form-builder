export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen m-0 flex items-center justify-center">
      {children}
    </div>
  );
}
