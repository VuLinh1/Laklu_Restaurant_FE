import * as React from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface DeleteRoleDialogProps {
  roleName: string;
  id: string;
  onConfirmDelete: (id: string) => void;
  triggerButton: React.ReactNode;
}

export const DeleteRoleDialog = ({
  roleName,
  id,
  onConfirmDelete,
  triggerButton,
}: DeleteRoleDialogProps) => {
  return (
    <ConfirmDialog
      title={'Bạn có chắc chắn muốn xóa vai trò này?'}
      message={`Hành động này không thể hoàn tác. Điều này sẽ xóa vai trò '${roleName}' và dữ liệu của nó khỏi máy chủ của chúng tôi.`}
      onConfirm={() => onConfirmDelete(id)}
      onCancel={function (): void {}}
      triggerButton={triggerButton}
    />
  );
};
