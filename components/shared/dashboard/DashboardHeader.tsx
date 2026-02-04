import {
  PanelLeft,
  LogOut,
  UserCircle,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { usePathname, useRouter } from 'next/navigation';
import { ChildMenu, DashboardUser } from '@/interface/dashboard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Notification from './Notification';
import { AppBreadcrumbs } from '../AppBreadcrumbs';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  user: DashboardUser;
  accountMenuItems: ChildMenu[];
  onMenuClick: () => void;
  showMobileMenu?: boolean;
  isMobile: boolean;
  onCollapseClick?: () => void;
  onClose: () => void;
  isCollapsed?: boolean;
}

export function DashboardHeader({
  user,
  accountMenuItems,
  onMenuClick,
  showMobileMenu = true,
  isMobile = false,
  onClose,
  onCollapseClick,
  isCollapsed = false,
}: DashboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <header className="bg-dashboard-sidebar flex h-16 items-center justify-between border-b px-4 py-10 md:px-6 shadow">
      {/* Left Section: Menu + Title */}
      <div className="flex items-center gap-5">
        {showMobileMenu && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        )}
        {onCollapseClick && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-7 w-7 md:flex"
            onClick={onCollapseClick}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeft className="text-icon h-8 w-8 rounded-lg" />
            ) : (
              <PanelLeft className="text-icon h-8 w-8 rounded-lg" />
            )}
          </Button>
        )}
        {/* <PanelLeft className="text-icon h-5 w-5 rounded-lg" /> */}
        <AppBreadcrumbs specialLabels={{}} />
      </div>
      {/* Right Section: Theme, Notifications, User */}
      <div className="flex items-center gap-0 pr-6">
        <div className="mx-4 hidden max-w-md flex-1 md:flex">
          <div className="relative w-full bg-gray-50 overflow-hidden rounded-md">
            <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-icon" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-10 text-sm "
            />
          </div>
        </div>

        {/* Notifications */}
        <Notification />
        <div className="p-3 pb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'text-accent-foreground hover:bg-accent flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isCollapsed && !isMobile && 'justify-center px-2',
                )}
                title={isCollapsed && !isMobile ? 'My Account' : undefined}
              >
                <UserCircle className="text-icon h-5 w-5 shrink-0" />
                {(!isCollapsed || isMobile) && (
                  <>
                    <span className="flex-1 text-left">My Account</span>
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isCollapsed && !isMobile ? 'end' : 'start'}
              side={isCollapsed && !isMobile ? 'right' : 'top'}
              className="w-56 border-none shadow-lg"
            >
              {accountMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.link;
                return (
                  <DropdownMenuItem key={item.link} asChild>
                    <Link
                      href={item.link!}
                      onClick={isMobile ? onClose : undefined}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
