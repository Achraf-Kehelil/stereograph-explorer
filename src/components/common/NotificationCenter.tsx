import { Bell } from 'lucide-react';
import { useNotifications } from '@/lib/notifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function NotificationCenter() {
  const { notifications, markAsRead, clearAll } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            No notifications
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start p-4"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-semibold">{notification.title}</span>
                  {!notification.readAt && (
                    <Badge className="bg-blue-500">New</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="border-t p-2 text-center"
              onClick={clearAll}
            >
              Clear all
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}