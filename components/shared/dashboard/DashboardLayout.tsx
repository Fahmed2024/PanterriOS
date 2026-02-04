'use client';

import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

import { DashboardUser, MenuItem } from '@/interface/dashboard';
import { accountMenu, SIDE_BAR_MENU } from './data';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentUser: DashboardUser;
}

export function DashboardLayout({
  children,
  currentUser,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function getMenuByRoles(roles: [] | undefined): MenuItem[] {
    if (!roles || roles.length === 0) {
      console.warn('Invalid or missing roles:', roles);
      return [];
    }

    const menuSet = new Set<MenuItem>();

    roles.forEach((role) => {
      if (role in SIDE_BAR_MENU) {
        SIDE_BAR_MENU[role as keyof typeof SIDE_BAR_MENU].forEach((menu) =>
          menuSet.add(menu),
        );
      }
    });

    return Array.from(menuSet);
  }

  const getInitialMenuOptions = (): MenuItem[] => {
    // const storedUser = localStorage.getItem('user');

    // if (!storedUser) return [];

    try {
      // TODO: pass retrival of user
      // const user: any = JSON.parse(storedUser);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = {
        email: 'Ahmed@email.com',
        firstName: 'Ahmed',
        lastName: 'Faruq',
        role: ['Admin.Officer'],
        profileImage: '',
        isVerified: false,
        isTwoFactorEnabled: false,
        isPasswordChanged: false,
      };
      return getMenuByRoles(user.role);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return [];
    }
  };

  const [menuOptions] = useState<MenuItem[]>(getInitialMenuOptions());

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="bg-dashboard-layout flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <DashboardSidebar
        navigationItems={menuOptions}
        isOpen={true}
        onClose={() => {}}
        isMobile={false}
        isCollapsed={sidebarCollapsed}
      />
      {/* Mobile Sidebar */}
      <DashboardSidebar
        navigationItems={menuOptions}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={true}
        isCollapsed={false}
      />

      {/* Main content */}
      <div className=" flex flex-1 flex-col overflow-hidden rounded-lg">
        <DashboardHeader
          user={currentUser}
          accountMenuItems={accountMenu}
          onMenuClick={toggleSidebar}
          onCollapseClick={toggleSidebarCollapse}
          isCollapsed={sidebarCollapsed}
          isMobile={true}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Page content */}
        <main className="bg-dashboard-sidebar flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
