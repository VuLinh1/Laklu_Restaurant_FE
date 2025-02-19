'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Car,
  Check,
  Eye,
  PencilLine,
  Plus,
  Save,
  Settings,
  Trash,
  X,
} from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { DeleteRoleDialog } from '@/app/(dashboard)/settings/roles/_components/DeleteRoleDialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import ConditionalVisibility from '@/components/ui/ConditionalVisibility';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  FixedHeightContainer,
  FixedHeightContainerContent,
} from '@/components/ui/FixedHeightContainer';

export interface RoleFormProps {
  readonly?: boolean;
  role?: boolean; // TODO: Replace with actual type
}

export default function RoleForm({ readonly, role }: RoleFormProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [name, setName] = React.useState('');
  const resetNameInput = () => {
    setName('');
    // TODO: refactor to add
    // if (role && form.name !== role.name) {
    //   resetForm({ name: role.name });
    // } else {
    //   resetForm({ name: '' });
    // }
  };
  return (
    <Card className={'rounded-none h-full'}>
      <CardHeader className={'border-b flex-row justify-between'}>
        <div className={'flex items-center gap-2 w-fit'}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-full border">
            <Settings className={'size-4'} />
          </div>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder={'Nhập tên vai trò'}
            value={name}
            autoFocus
            disabled={readonly || (!isEditing && role)}
          />

          {/*TODO: add conditional only show when has form value*/}
          <ConditionalVisibility visible={!readonly && name !== ''}>
            <Button variant="outline" size="icon" className={'aspect-square'}>
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className={'aspect-square'}
              onClick={resetNameInput}
            >
              <X className="h-4 w-4" />
            </Button>
          </ConditionalVisibility>
          <ConditionalVisibility
            visible={!readonly && !isEditing && (role ?? false)}
          >
            <Button
              variant="outline"
              size="icon"
              className={'aspect-square'}
              onClick={() => setIsEditing(true)}
            >
              <PencilLine className="h-4 w-4" />
            </Button>
          </ConditionalVisibility>
        </div>
        <div className={'flex gap-2'}>
          <ConditionalVisibility visible={!readonly}>
            <Button variant={'default'}>
              <Save />
              Lưu
            </Button>
          </ConditionalVisibility>
          <ConditionalVisibility visible={!readonly && !!role}>
            <DeleteRoleDialog
              roleName={'Vai trò Test'}
              id={'test'}
              onConfirmDelete={(id) => console.log(id)}
              triggerButton={
                <Button variant={'destructive'}>
                  <Trash /> Xóa vai trò
                </Button>
              }
            />
          </ConditionalVisibility>
        </div>
      </CardHeader>
      <CardContent className={'grid grid-cols-1 gap-6'}>
        <Tabs defaultValue="general">
          <TabsList className={'mt-4'}>
            <TabsTrigger value="general" className={'font-semibold'}>
              Cài đặt chung
            </TabsTrigger>
            <TabsTrigger value="permission" className={'font-semibold'}>
              Phân quyền
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card className={'rounded-none mt-4 w-[40%]'}>
              <CardHeader className={'p-4 broder-b'}>
                <p className="text-lg font-bold">Mô tả vai trò</p>
                <p className={'text-[0.8rem] text-muted-foreground'}>
                  Mô tả về vai trò trong hệ thống
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  className={'min-h-[200px]'}
                  placeholder="Thêm mô tả cho vai trò"
                  disabled={readonly}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="permission" className={"h-full"}>
            <FixedHeightContainer useFullHeightScreen={false}>
              <FixedHeightContainerContent>
                <Card className={'rounded-none mt-4'}>
                  <CardHeader className={'p-4 broder-b'}>
                    <p className="text-lg font-bold">Quản lý người dùng</p>
                    <p className={'text-[0.8rem] text-muted-foreground'}>
                      Quản lý người dùng trong hệ thống
                    </p>
                  </CardHeader>
                  <CardContent className={'grid grid-cols-1 gap-4'}>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Thêm người dùng</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Thêm người dùng vào hệ thống
                        </p>
                      </div>
                      <Switch disabled={readonly} />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Sửa người dùng</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Cập nhật thông tin người dùng trong hệ thống
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Xóa người dùng</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Xóa thông tin người dùng trong hệ thống
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Hiển thị danh sách</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Hiển thị danh sách người dùng trong hệ thống
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
                <Card className={'rounded-none mt-4'}>
                  <CardHeader className={'p-4 broder-b'}>
                    <p className="text-lg font-bold">Quản lý người dùng</p>
                    <p className={'text-[0.8rem] text-muted-foreground'}>
                      Quản lý người dùng trong hệ thống
                    </p>
                  </CardHeader>
                  <CardContent className={'grid grid-cols-1 gap-4'}>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Thêm người dùng</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Thêm người dùng vào hệ thống
                        </p>
                      </div>
                      <Switch disabled={readonly} />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Sửa người dùng</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Cập nhật thông tin người dùng trong hệ thống
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Xóa người dùng</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Xóa thông tin người dùng trong hệ thống
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Hiển thị danh sách</Label>
                        <p className={'text-[0.8rem] text-muted-foreground'}>
                          Hiển thị danh sách người dùng trong hệ thống
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </FixedHeightContainerContent>
            </FixedHeightContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
