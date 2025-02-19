import RoleForm from '@/app/(dashboard)/settings/roles/_components/RoleForm';
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <RoleForm
        readonly={true}
        role={!!id}
      />
    </>
  );
}
