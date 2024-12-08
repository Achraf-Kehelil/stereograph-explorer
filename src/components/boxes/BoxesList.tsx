import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, PhoneCall } from 'lucide-react';
import { Box } from '@/types';
import { Badge } from '@/components/ui/badge';

interface BoxesListProps {
  boxes: Box[];
  onEditBox: (box: Box) => void;
}

export function BoxesList({ boxes, onEditBox }: BoxesListProps) {
  const getStatusBadge = (status: Box['status']) => {
    const variants = {
      available: 'bg-green-100 text-green-800',
      'in-use': 'bg-blue-100 text-blue-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
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
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Visitor Phone</TableHead>
          <TableHead>Prisoner Phone</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {boxes.map((box) => (
          <TableRow key={box.id}>
            <TableCell className="font-medium">{box.name}</TableCell>
            <TableCell>{getStatusBadge(box.status)}</TableCell>
            <TableCell>{box.visitorPhone}</TableCell>
            <TableCell>{box.prisonerPhone}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditBox(box)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {box.status === 'available' && (
                  <Button variant="ghost" size="sm">
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}