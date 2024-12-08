import { useState } from 'react';
import { useAuth, getDefaultCredentials } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Shield, Info } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/types';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('agent007');
  const { login } = useAuth();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (!success) {
      setError('Identifiants invalides');
    }
  };

  const handleRoleSelect = (role: Role) => {
    const credentials = getDefaultCredentials(role);
    setSelectedRole(role);
    setUsername(credentials.username);
    setPassword(credentials.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo-mj.png" 
              alt="Ministère de la Justice" 
              className="h-16 w-auto"
            />
            <div className="h-12 w-px bg-gray-200" />
            <img 
              src="/flag-tn.png" 
              alt="Drapeau Tunisien" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{t('auth.login.title')}</h1>
            <p className="mt-2 text-sm text-gray-600">
              {t('auth.login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Select
                value={selectedRole}
                onValueChange={(value: Role) => handleRoleSelect(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="directeur">Directeur</SelectItem>
                  <SelectItem value="superviseur">Superviseur</SelectItem>
                  <SelectItem value="agent007">Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Input
                type="text"
                placeholder={t('auth.login.username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder={t('auth.login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              {t('auth.login.submit')}
            </Button>
          </form>

          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Identifiants de démonstration
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Sélectionnez un rôle pour afficher les identifiants correspondants.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}