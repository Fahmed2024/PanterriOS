import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Mission Assigned',
      message: 'You have been assigned to Survey Project #4521',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      title: 'Report Approved',
      message: 'Your report for Lagos Urban Survey has been approved',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New features available in the dashboard',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="text-icon h-6 w-6" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center p-1.5 text-xs font-normal"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dark:bg-card w-80 bg-white p-0" align="end">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-primary h-auto p-0 text-xs hover:underline"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BellOff className="text-muted-foreground mb-2 h-12 w-12" />
              <p className="text-muted-foreground text-sm">No notifications</p>
              <p className="text-muted-foreground mt-1 text-xs">
                You`re all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`hover:bg-accent w-full p-4 text-left transition-colors`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {notification.message}
                      </p>
                      <p className="text-muted-foreground mt-2 text-xs">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
