export default async function UniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="p-20 text-2xl">Страница университета: {id}</div>
  );
}
