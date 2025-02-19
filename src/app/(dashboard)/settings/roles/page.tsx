'use client';

import * as React from 'react';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteRoleDialog } from '@/app/(dashboard)/settings/roles/_components/DeleteRoleDialog';
import Link from 'next/link';

// Define the structure for a role
interface RoleListItem {
  id: string;
  name: string;
  description: string;
  userCount: 12;
}

// Sample data for roles
const initialRoles: RoleListItem[] = [
  {
    id: '1',
    name: 'Admin',
    description:
      'Truy cập đầy đủ vào tất cả các tính năng, bao gồm quản lý người dùng, tạo nội dung và cài đặt hệ thống',
    userCount: 12,
  },
  {
    id: '2',
    name: 'Editor',
    description:
      'Có thể chỉnh sửa nội dung, bao gồm tạo và cập nhật các bài viết, nhưng không thể xóa hoặc quản lý người dùng.',
    userCount: 12,
  },
  {
    id: '3',
    name: 'Viewer',
    description:
      'Chỉ có thể xem nội dung, không có quyền để tạo, cập nhật hoặc xóa bất kỳ dữ liệu nào',
    userCount: 12,
  },
];

// Available permissions
const availablePermissions = [
  { id: 'create', label: 'Create' },
  { id: 'read', label: 'Read' },
  { id: 'update', label: 'Update' },
  { id: 'delete', label: 'Delete' },
];

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên phải có ít nhất 2 ký tự.',
  }),
  description: z.string(),
  permissions: z.array(z.string()).refine((value) => value.length > 0, {
    message: 'Bạn phải chọn ít nhất một quyền.',
  }),
});

export default function RoleManagement() {
  const [roles, setRoles] = React.useState<RoleListItem[]>(initialRoles);
  const [editingRole, setEditingRole] = React.useState<RoleListItem | null>(
    null
  );
  const deleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const columns: ColumnDef<RoleListItem>[] = [
    {
      accessorKey: 'name',
      header: 'Vai trò',
      cell: ({ row }) => (
        <div
          key={row.id}
          className="text-muted-foreground py-1 grid grid-cols-1 gap-1.5 text-sm"
        >
          <p className={'font-bold'}>{row.original.name}</p>
          <p>{row.original.description}</p>
        </div>
      ),
      meta: {
        headerClassName: 'w-[50%]',
      },
    },
    {
      accessorKey: 'userCount',
      header: 'Số lượng người dùng có vai trò',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 w-full text-center">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs">
            {row.original.userCount}
          </span>
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link className={"text-primary"} href={`/settings/roles/${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link className={"text-primary"} href={`/settings/roles/edit/${row.original.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteRoleDialog
            triggerButton={
              <Button  className={"text-primary"} variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            id={row.original.id}
            roleName={row.original.name}
            onConfirmDelete={(id) => deleteRole(id)}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: roles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="rounded-none">
      <CardHeader className={'border-b flex justify-between flex-row'}>
        <div>
          <CardTitle>Vai trò</CardTitle>
          <CardDescription>
            Vai trò giúp thiết lập các quyền truy cập vào các chức năng của hệ
            thống
          </CardDescription>
        </div>
        <Button asChild={true}>
          <Link href={'/settings/roles/add'}>
            <Plus /> Thêm vai trò
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.columnDef.meta?.headerClassName ?? ''
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
