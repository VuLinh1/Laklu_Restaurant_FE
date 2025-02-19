'use client';

import * as React from 'react';
import {
  ArrowLeftRight,
  Banknote,
  Calendar,
  ChartSpline,
  HandPlatter,
  Settings2,
  UsersRound,
  Utensils,
} from 'lucide-react';

import { NavItem, NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { MdRestaurantMenu } from 'react-icons/md';
import { BiSolidFoodMenu } from 'react-icons/bi';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Laklu',
      logo: Utensils,
      plan: 'Nhà hàng',
    },
  ],
  navMain: [
    {
      title: 'Thống kê',
      url: '/',
      icon: ChartSpline,
      isActive: true,
      items: [
        {
          title: 'Tổng quát',
          url: '/',
        },
        {
          title: 'Giao dịch',
          url: '#',
        },
        {
          title: 'Món ăn',
          url: '#',
        },
        {
          title: 'Lương',
          url: '#',
        },
      ],
    },
    {
      title: 'Menu',
      url: '#',
      icon: BiSolidFoodMenu,
      isActive: true,
      items: [
        {
          title: 'Danh mục',
          url: '#',
        },
        {
          title: 'Món ăn',
          url: '#',
        },
      ],
    },
    {
      title: 'Nhân viên',
      url: '#',
      icon: UsersRound,
      items: [
        {
          title: 'Danh sách',
          url: '#',
        },
        {
          title: 'Lịch làm việc',
          url: '#',
        },
        {
          title: 'Tính lương',
          url: '#',
        },
      ],
    },
    {
      title: 'Cài đặt',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Vai trò',
          url: '/settings/roles',
          items: [
            {
              title: 'Thêm',
              url: '/settings/roles/add',
            },
            {
              title: 'Sửa',
              url: '/settings/roles/edit/:id',
            },
            {
              title: 'Chi tiết',
              url: '/settings/roles/:id',
              items: [
                {
                  title: 'Test',
                  url: '/settings/roles/:id/test',
                },    
              ],
            },
          ],
        },
        {
          title: 'Quyền',
          url: '#',
        },
      ],
    },
  ],
  navQuick: [
    {
      title: 'Máy POS',
      url: '#',
      icon: Banknote,
    },
    {
      title: 'Chọn món',
      url: '#',
      icon: MdRestaurantMenu,
    },
    {
      title: 'Giao dịch',
      url: '#',
      icon: ArrowLeftRight,
    },
    {
      title: 'Bàn',
      url: '#',
      icon: HandPlatter,
    },
    {
      title: 'Lịch hẹn',
      url: '#',
      icon: Calendar,
    },
  ],
};
export const navItem: NavItem[] = [...data.navMain, ...data.navQuick];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} title={'Quản lý'} />
        <NavMain items={data.navQuick} title={'Nhà hàng'} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
