import { UserRole } from '@/types'

import { IconType } from 'react-icons/lib'

export interface NavigationItem {
  title: string
  href?: string
  icon: IconType
  roles: UserRole[]
  children?: NavigationItem[]
}

export interface AccountMenuItem {
  title: string
  href: string
  icon: IconType
}

export interface DashboardConfig {
  navigationItems: NavigationItem[]
  accountMenuItems: AccountMenuItem[]
  baseRoute: string
}
