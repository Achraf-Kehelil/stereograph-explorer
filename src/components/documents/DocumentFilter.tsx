import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Document } from '@/types';

interface DocumentFilterProps {
  filters: {
    type: string;
    status: string;
    search: string;
  };
  onFiltersChange: (filters: {
    type: string;
    status: string;
    search: string;
  }) => void;
}

export function DocumentFilter({ filters, onFiltersChange }: DocumentFilterProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Type de document</Label>
        <Select
          value={filters.type || "all"}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, type: value === "all" ? "" : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="authorization">Autorisation</SelectItem>
            <SelectItem value="id">Pièce d'identité</SelectItem>
            <SelectItem value="report">Rapport</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Statut</Label>
        <Select
          value={filters.status || "all"}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value === "all" ? "" : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="valid">Valide</SelectItem>
            <SelectItem value="expired">Expiré</SelectItem>
            <SelectItem value="revoked">Révoqué</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Rechercher</Label>
        <Input
          placeholder="Rechercher un document..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
        />
      </div>
    </div>
  );
}