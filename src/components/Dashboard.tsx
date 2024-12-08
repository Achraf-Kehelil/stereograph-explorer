import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useI18n } from '@/lib/i18n';
import { hasPermission } from '@/lib/permissions';
import { Button } from '@/components/ui/button';
import {
  LogOut,
  LayoutDashboard,
  Phone,
  Users,
  Settings,
  FileText,
  Shield,
  UserCircle,
  Calendar,
  FileBox,
} from 'lucide-react';
import { Header } from '@/components/common/Header';
import { CallsList } from '@/components/calls/CallsList';
import { BoxesManagement } from '@/components/boxes/BoxesManagement';
import { Statistics } from '@/components/statistics/Statistics';
import { UserManagement } from '@/components/users/UserManagement';
import { LogExplorer } from '@/components/logs/LogExplorer';
import { PrisonersManagement } from '@/components/prisoners/PrisonersManagement';
import { VisitorsManagement } from '@/components/visitors/VisitorsManagement';
import { CalendarView } from '@/components/calendar/CalendarView';
import { DocumentCenter } from '@/components/documents/DocumentCenter';

type Tab = 
  | 'calls'
  | 'boxes'
  | 'statistics'
  | 'users'
  | 'logs'
  | 'prisoners'
  | 'visitors'
  | 'calendar'
  | 'documents';

export function Dashboard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<Tab>('calls');

  const menuItems: { id: Tab; label: string; icon: any; permission?: string }[] = [
    { id: 'calls', label: t('menu.calls'), icon: Phone, permission: 'view_calls' },
    { id: 'boxes', label: t('menu.boxes'), icon: Settings, permission: 'manage_boxes' },
    { id: 'statistics', label: t('menu.statistics'), icon: LayoutDashboard, permission: 'view_statistics' },
    { id: 'prisoners', label: t('menu.prisoners'), icon: UserCircle, permission: 'manage_prisoners' },
    { id: 'visitors', label: t('menu.visitors'), icon: Users, permission: 'manage_visitors' },
    { id: 'calendar', label: t('menu.calendar'), icon: Calendar },
    { id: 'documents', label: t('menu.documents'), icon: FileBox, permission: 'manage_documents' },
    { id: 'users', label: t('menu.users'), icon: Users, permission: 'manage_users' },
    { id: 'logs', label: t('menu.logs'), icon: FileText, permission: 'view_logs' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex space-x-4 border-b border-gray-200">
          {menuItems.map((item) => (
            (!item.permission || hasPermission(user.role, item.permission)) && (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(item.id)}
                className="h-12 rounded-none border-b-2 border-transparent px-4 hover:border-primary"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            )
          ))}
        </div>

        <main>
          {activeTab === 'calls' && <CallsList />}
          {activeTab === 'boxes' && <BoxesManagement />}
          {activeTab === 'statistics' && <Statistics />}
          {activeTab === 'prisoners' && hasPermission(user.role, 'manage_prisoners') && <PrisonersManagement />}
          {activeTab === 'visitors' && hasPermission(user.role, 'manage_visitors') && <VisitorsManagement />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'documents' && hasPermission(user.role, 'manage_documents') && <DocumentCenter />}
          {activeTab === 'users' && hasPermission(user.role, 'manage_users') && <UserManagement />}
          {activeTab === 'logs' && hasPermission(user.role, 'view_logs') && <LogExplorer />}
        </main>
      </div>
    </div>
  );
}