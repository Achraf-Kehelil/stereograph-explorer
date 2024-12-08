import { Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';
import { NotificationCenter } from './NotificationCenter';

export function Header() {
  const { user, logout } = useAuth();
  const { t } = useI18n();

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-mj.png" 
                alt="Ministère de la Justice" 
                className="h-12 w-auto"
              />
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">
                  StereoGraph Explorer
                </span>
                <span className="text-sm text-gray-600">
                  Ministère de la Justice - République Tunisienne
                </span>
              </div>
            </div>
            <img 
              src="/flag-tn.png" 
              alt="Drapeau Tunisien" 
              className="h-8 w-auto ml-4"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <NotificationCenter />
            <span className="text-sm text-gray-600">
              {user.name} ({t(`roles.${user.role}`)})
            </span>
            <Button variant="ghost" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('auth.logout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}