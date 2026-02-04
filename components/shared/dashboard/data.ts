import { ChildMenu, MenuItem } from '@/interface';
import { LucideIcon, Menu, Settings } from 'lucide-react';

export const USER_ROLES = [
  { value: 'Admin.Officer', title: 'Admin Officer' },
  { value: 'Real.Estate.Analyst', title: 'Real Estate Analyst' },
  { value: 'Content.Editor', title: 'Content Editor' },
];
export const ACCOUNT_STATUS = [
  { value: 'activated', title: 'Activated' },
  { value: 'deactivated', title: 'Deactivated' },
  { value: 'pending', title: 'Pending' },
  { value: 'banned', title: 'Banned' },
  { value: 'suspended', title: 'Suspended' },
];
export const DEPARTMENTS = [
  { value: 'Human.Resource', title: 'Human Resource/Admin' },
];
export type Role = 'Admin.Officer' | 'Real.Estate.Analyst' | 'Content.Editor';

// | 'Community.Manager';

// Common menu items shared across all roles
export const COMMON_MENU: MenuItem[] = [
  { name: 'Dashboard', icon: Menu, link: '/dashboard' },
];

// Role-specific menu items
export const ROLE_SPECIFIC_MENUS: Record<Role, MenuItem[]> = {
  'Admin.Officer': [
    { name: 'Investors', icon: Menu, link: '/dashboard/investors' },
    { name: 'Investments', icon: Menu, link: '/dashboard/investments' },
    {
      name: 'Wallet & Finace',
      icon: Menu,
      link: '/dashboard/finace',
    },
    { name: 'Market Data', icon: Menu, link: '/dashboard/market-data' },
    { name: 'Analytics', icon: Menu, link: '/dashboard/analytics' },
    { name: 'Articles', icon: Menu, link: '/dashboard/articles' },
    { name: 'Events', icon: Menu, link: '/dashboard/events' },
    { name: 'Ai Agents', icon: Menu, link: '/dashboard/ai-agents' },
    { name: 'Users & Roles', icon: Menu, link: '/dashboard/users' },
    { name: 'Audit Log', icon: Menu, link: '/dashboard/audit-log' },
  ],
  'Real.Estate.Analyst': [],
  'Content.Editor': [],
};

// Function to generate the final menu for each role
export const SIDE_BAR_MENU: Record<Role, MenuItem[]> = Object.keys(
  ROLE_SPECIFIC_MENUS,
).reduce(
  (acc, role) => {
    acc[role as Role] = [...COMMON_MENU, ...ROLE_SPECIFIC_MENUS[role as Role]];
    return acc;
  },
  {} as Record<Role, MenuItem[]>,
);

export const MOBILE_SIDE_BAR_MENU: Record<Role, MenuItem[]> = Object.keys(
  ROLE_SPECIFIC_MENUS,
).reduce(
  (acc, role) => {
    acc[role as Role] = [...ROLE_SPECIFIC_MENUS[role as Role]];
    return acc;
  },
  {} as Record<Role, MenuItem[]>,
);

export const accountMenu: ChildMenu[] = [
  {
    name: 'Settings',
    link: '/dahsboard/settings',
    icon: Settings,
  },
];
