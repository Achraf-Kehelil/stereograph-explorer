import { useState } from 'react';
import { Prisoner } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PrisonerFormProps {
  prisoner?: Prisoner | null;
  onSave: (prisoner: Prisoner) => void;
  onCancel: () => void;
}

export function PrisonerForm({ prisoner, onSave, onCancel }: PrisonerFormProps) {
  const [formData, setFormData] = useState<Partial<Prisoner>>(
    prisoner || {
      name: '',
      prisonerId: '',
      cell: '',
      status: 'incarcerated',
      entryDate: new Date().toISOString().split('T')[0],
      visitationRights: {
        status: 'allowed',
        restrictions: [],
        allowedVisitors: [],
      },
      documents: [],
      notes: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: prisoner?.id || String(Math.random()),
      documents: prisoner?.documents || [],
      visitationRights: {
        ...formData.visitationRights!,
        restrictions: formData.visitationRights?.restrictions || [],
        allowedVisitors: formData.visitationRights?.allowedVisitors || [],
      },
    } as Prisoner);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateVisitationRights = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      visitationRights: {
        ...prev.visitationRights!,
        [field]: value,
      },
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {prisoner ? 'Modifier le détenu' : 'Ajouter un détenu'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nom complet</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Nom du détenu"
              />
            </div>

            <div className="space-y-2">
              <Label>Numéro d'écrou</Label>
              <Input
                required
                value={formData.prisonerId}
                onChange={(e) => updateFormData('prisonerId', e.target.value)}
                placeholder="Numéro d'écrou"
              />
            </div>

            <div className="space-y-2">
              <Label>Cellule</Label>
              <Input
                required
                value={formData.cell}
                onChange={(e) => updateFormData('cell', e.target.value)}
                placeholder="Numéro de cellule"
              />
            </div>

            <div className="space-y-2">
              <Label>Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Prisoner['status']) =>
                  updateFormData('status', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incarcerated">Incarcéré</SelectItem>
                  <SelectItem value="transferred">Transféré</SelectItem>
                  <SelectItem value="released">Libéré</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date d'entrée</Label>
              <Input
                type="date"
                required
                value={formData.entryDate?.split('T')[0]}
                onChange={(e) => updateFormData('entryDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date de libération</Label>
              <Input
                type="date"
                value={formData.releaseDate?.split('T')[0]}
                onChange={(e) => updateFormData('releaseDate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Droits de visite</Label>
            <Select
              value={formData.visitationRights?.status}
              onValueChange={(value: Prisoner['visitationRights']['status']) =>
                updateVisitationRights('status', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allowed">Autorisé</SelectItem>
                <SelectItem value="restricted">Restreint</SelectItem>
                <SelectItem value="suspended">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.visitationRights?.status === 'restricted' && (
            <div className="space-y-2">
              <Label>Restrictions</Label>
              <Textarea
                value={formData.visitationRights?.restrictions?.join('\n')}
                onChange={(e) =>
                  updateVisitationRights(
                    'restrictions',
                    e.target.value.split('\n').filter(Boolean)
                  )
                }
                placeholder="Une restriction par ligne"
                rows={3}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              placeholder="Notes additionnelles"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              {prisoner ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}