import { TableHead } from '@/components/ui/table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SortDirection } from '@/hooks/useTable';

interface TableHeaderCellProps {
  label: string;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

export function TableHeaderCell({
  label,
  sortKey,
  sortDirection,
  onSort,
}: TableHeaderCellProps) {
  if (!sortKey || !onSort) {
    return <TableHead>{label}</TableHead>;
  }

  return (
    <TableHead>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 hover:bg-transparent"
        onClick={onSort}
      >
        {label}
        {sortDirection === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
        {sortDirection === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
        {!sortDirection && <ArrowUpDown className="ml-2 h-4 w-4" />}
      </Button>
    </TableHead>
  );
}