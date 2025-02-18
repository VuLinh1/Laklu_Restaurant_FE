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
import React, { useCallback } from 'react';
import { useBreadcrumbStore } from '@/stores/useBreadcrumbStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: NavItem[];
}

export function NavMain({ title, items }: { title: string; items: NavItem[] }) {
  const { setBreadcrumb } = useBreadcrumbStore();
  const path = usePathname();
  const isActive = useCallback(
    (item: NavItem) => {
      if (item.url === path) {
        return true;
      }
      if (item.items) {
        return item.items.some((subItem) => subItem.url === path);
      }
    },
    [items, path]
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
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : ''
                  }
                >
                  {!item.items ? (
                    <>
                      {item.icon && <item.icon />}
                      <Link
                        href={item.url}
                        onClick={() =>
                          setBreadcrumb({
                            current: { title: item.title, url: item.url },
                          })
                        }
                      >
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
                            <Link
                              href={subItem.url}
                              onClick={() =>
                                setBreadcrumb({
                                  current: {
                                    title: subItem.title,
                                    url: subItem.url,
                                  },
                                  previous: {
                                    title: item.title,
                                    url: item.url,
                                  },
                                })
                              }
                            >
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
