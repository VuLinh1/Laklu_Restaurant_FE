'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {Check, Eye, PencilLine, Plus, Settings, Trash, X} from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { DeleteRoleDialog } from '@/app/(dashboard)/settings/roles/_components/DeleteRoleDialog';

export default function RoleForm() {
  return (
    <Card className={'rounded-none'}>
      <CardHeader className={'border-b flex-row justify-between'}>
        <div className={'flex items-center gap-2 w-fit'}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Settings className={'size-4'} />
          </div>
          <Input placeholder={'Nhập tên vai trò'} autoFocus />
          <Button variant="outline" size="icon" className={'aspect-square'}>
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" className={'aspect-square'}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DeleteRoleDialog
          roleName={'Vai trò Test'}
          id={'test'}
          onConfirmDelete={(id) => console.log(id)}
          triggerButton={
            <Button variant={"destructive"}>
              <Trash /> Xóa vai trò
            </Button>
          }
        />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
