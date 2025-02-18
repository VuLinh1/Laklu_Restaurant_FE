'use client';
import { AppSidebar, navItem } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useBreadcrumbStore } from '@/stores/useBreadcrumbStore';
import React, { useEffect } from 'react';
import { Breadcrumb as BreadcrumbType } from '@/stores/useBreadcrumbStore';
import {
  FixedHeightContainer,
  FixedHeightContainerContent,
} from '@/components/ui/FixedHeightContainer';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { setBreadcrumb } = useBreadcrumbStore();
  useEffect(() => {
    navItem.forEach((item) => {
      
      let breadcrumb: BreadcrumbType = { 
        current: { title: '', url: '' },
        previous: { title: '', url: '' },
      };
      
      if (item.url === path) {
          breadcrumb.current = { title: item.title, url: item.url };
      }
      if (item.items) {
        item.items.forEach((subItem) => {
          if (subItem.url === path) {
            setBreadcrumb({
              previous: { title: item.title, url: item.url },
              current: { title: subItem.title, url: subItem.url },
            });
          }
        });
      }
    });
  }, [path]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <FixedHeightContainer useFullHeightScreen>
          <header className="flex h-16 bg-sidebar shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadCrumbHeader />
            </div>
          </header>
          <FixedHeightContainerContent>
            <div className="flex flex-1 flex-col gap-4 p-6">{children}</div>
          </FixedHeightContainerContent>
        </FixedHeightContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
const BreadCrumbHeader = () => {
  const { breadcrumb } = useBreadcrumbStore();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb?.previous && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={breadcrumb?.previous.url}>
                {breadcrumb?.previous.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumb?.current && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </>
        )}
        {breadcrumb?.current && (
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumb?.current.title}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
