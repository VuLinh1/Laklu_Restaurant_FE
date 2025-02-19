'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { NavItem } from '../nav-main';
import { navItem } from '@/components/app-sidebar';
import { usePathname } from 'next/navigation';
import UrlPattern from 'url-pattern';
export interface BreadcrumbLinkType {
  title: string;
  url: string;
}
export const BreadCrumbHeader = () => {
  const path = usePathname();
  const breadcrumbs = useMemo(() => generateBreadcrumb(navItem, path), [path]);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.url}>
            <BreadcrumbItem className="hidden md:block">
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className={"underline"}>{crumb.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.url}>{crumb.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

function matchUrl(pattern: string, url: string): boolean {
  const p = new UrlPattern(pattern);
  return p.match(url) !== null;
}

function findParents( 
  menu: NavItem[],
  targetUrl: string
): Pick<NavItem, 'title' | 'url'>[] {
  const parents: NavItem[] = [];

  function find(menu: NavItem[], targetUrl: string): boolean {
    for (const item of menu) {
      if (matchUrl(item.url, targetUrl)) {
        parents.push(item);
        return true;
      }
      if (item.items && find(item.items, targetUrl)) {
        parents.push(item);
        return true;
      }
    }
    return false;
  }

  find(menu, targetUrl);
  return parents
    .reverse()
    .map((parent) => ({ title: parent.title, url: parent.url }));
}

export function resolveUrl(urlPattern: string, currentUrl: string): string {
  const urlPatternPath = urlPattern.split('/');
  const currentUrlPath = currentUrl.split('/');
  for (let i = 0; i < urlPatternPath.length; i++) {
      if (currentUrlPath[i]) {
        urlPatternPath[i] = currentUrlPath[i];
      }
  }
  return urlPatternPath.join('/');
}

export function generateBreadcrumb(menu: NavItem[], path: string): NavItem[] {
  const parents = findParents(menu, path);
  const breadcrumbUrls: BreadcrumbLinkType[] = [];
  
  for (const parent of parents) {
    breadcrumbUrls.push({ title: parent.title, url: resolveUrl(parent.url, path) });
  }
  return breadcrumbUrls;
}
