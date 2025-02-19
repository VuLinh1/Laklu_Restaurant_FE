import RoleForm from '@/app/(dashboard)/settings/roles/_components/RoleForm';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <RoleForm
        role={!!id}
      />
    </>
  );
}
