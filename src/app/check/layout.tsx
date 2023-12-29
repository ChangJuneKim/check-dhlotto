export default function CheckLayout({
  children,
  parallel,
}: {
  children: React.ReactNode;
  parallel: React.ReactNode;
}) {
  return (
    <>
      {children}
      {parallel}
    </>
  );
}
