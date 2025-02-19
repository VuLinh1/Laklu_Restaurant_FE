'use client';

import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  generateBreadcrumb,
  resolveUrl,
} from '@/components/ui/BreadcrumbHeader';

export interface NavItem {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: NavItem[];
}

export function NavMain({ title, items }: { title: string; items: NavItem[] }) {
  const path = usePathname();
  const breadcrumb = generateBreadcrumb(items, path);
  const isActive = useCallback(
    (item: NavItem) => {
      const isBreadcrumbMatch = (navItem: NavItem) =>
        breadcrumb.some(
          (i) =>
            i.url === resolveUrl(navItem.url, path) && i.title === navItem.title
        );

      if (isBreadcrumbMatch(item)) {
        return true;
      }

      if (item.items) {
        return item.items.some(isBreadcrumbMatch);
      }

      return false;
    },
    [breadcrumb, path]
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isActive(item)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={
                    isActive(item)
                      ? 'bg-blue-400 text-accent-foreground'
                      : ''
                  }
                >
                  {!item.items ? (
                    <>
                      {item.icon && <item.icon />}
                      <Link href={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            className={
                              isActive(subItem)
                                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                : ''
                            }
                            asChild
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
