import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Prisoner } from '@/types';
import { formatDateTime } from '@/lib/utils';

interface PrisonersListProps {
  prisoners: Prisoner[];
  onSelectPrisoner: (prisoner: Prisoner) => void;
}

export function PrisonersList({ prisoners, onSelectPrisoner }: PrisonersListProps) {
  const getStatusBadge = (status: Prisoner['status']) => {
    const variants = {
      incarcerated: 'bg-blue-100 text-blue-800',
      transferred: 'bg-yellow-100 text-yellow-800',
      released: 'bg-green-100 text-green-800',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getVisitationBadge = (status: Prisoner['visitationRights']['status']) => {
    const variants = {
      allowed: 'bg-green-100 text-green-800',
      restricted: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Cellule</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Date d'entrée</TableHead>
          <TableHead>Droits de visite</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prisoners.map((prisoner) => (
          <TableRow key={prisoner.id}>
            <TableCell>{prisoner.prisonerId}</TableCell>
            <TableCell className="font-medium">{prisoner.name}</TableCell>
            <TableCell>{prisoner.cell}</TableCell>
            <TableCell>{getStatusBadge(prisoner.status)}</TableCell>
            <TableCell>{formatDateTime(prisoner.entryDate)}</TableCell>
            <TableCell>
              {getVisitationBadge(prisoner.visitationRights.status)}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectPrisoner(prisoner)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}