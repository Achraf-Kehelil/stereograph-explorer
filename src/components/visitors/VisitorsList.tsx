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
import { Visitor } from '@/types';
import { formatDateTime } from '@/lib/utils';

interface VisitorsListProps {
  visitors: Visitor[];
  onSelectVisitor: (visitor: Visitor) => void;
}

export function VisitorsList({ visitors, onSelectVisitor }: VisitorsListProps) {
  const getStatusBadge = (status: Visitor['status']) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-red-100 text-red-800',
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
          <TableHead>Relation</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Dernière mise à jour</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visitors.map((visitor) => (
          <TableRow key={visitor.id}>
            <TableCell>{visitor.idNumber}</TableCell>
            <TableCell className="font-medium">{visitor.name}</TableCell>
            <TableCell>{visitor.relationship}</TableCell>
            <TableCell>{getStatusBadge(visitor.status)}</TableCell>
            <TableCell>{visitor.contactInfo.phone}</TableCell>
            <TableCell>{formatDateTime(visitor.updatedAt)}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectVisitor(visitor)}
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