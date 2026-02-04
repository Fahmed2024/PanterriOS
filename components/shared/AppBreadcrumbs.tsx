'use client';

import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export function AppBreadcrumbs({
  specialLabels = {},
}: {
  specialLabels?: Record<string, string>;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Overview: only show 'Overview'
  if (pathname === '/' || pathname === '') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-foreground">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Task Management: only show 'Task Management'
  if (segments.length === 1 && segments[0] === 'task-management') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/task-management" className="text-foreground">
              Task Management
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Drone Operations and children: show full path
  if (segments[0] === 'drone-operations') {
    const crumbs = [
      { label: 'Drone Operations', href: '/drone-operations' },
      ...segments.slice(1).map((seg, idx) => {
        const label =
          specialLabels[seg] ||
          seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        return {
          label,
          href: '/drone-operations/' + segments.slice(1, idx + 2).join('/'),
        };
      }),
    ];
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href + '-' + crumb.label}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={crumb.href}
                  className={
                    i === crumbs.length - 1
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }
                >
                  {crumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i < crumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Fallback: show only the last segment as the page title
  const last = segments[segments.length - 1];
  const label =
    specialLabels[last] ||
    last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={pathname} className="text-foreground">
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
