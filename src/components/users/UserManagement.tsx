import { useState } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/data/mockData';
import { UsersList } from './UsersList';
import { UserForm } from './UserForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: String(users.length + 1) }]);
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <Card className="p-4">
        <UsersList
          users={users}
          onEditUser={(user) => {
            setSelectedUser(user);
            setIsFormOpen(true);
          }}
        />
      </Card>
      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}