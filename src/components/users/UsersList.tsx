import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';

interface UsersListProps {
  users: User[];
  onEditUser: (user: User) => void;
}

export function UsersList({ users, onEditUser }: UsersListProps) {
  const getRoleBadge = (role: User['role']) => {
    const variants = {
      directeur: 'bg-purple-100 text-purple-800',
      agent007: 'bg-blue-100 text-blue-800',
    };

    return (
      <Badge className={variants[role]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{getRoleBadge(user.role)}</TableCell>
            <TableCell>{formatDateTime(user.lastActive)}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditUser(user)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}