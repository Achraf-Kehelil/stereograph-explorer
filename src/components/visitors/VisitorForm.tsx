import { useState } from 'react';
import { Visitor } from '@/types';
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

interface VisitorFormProps {
  visitor?: Visitor | null;
  onSave: (visitor: Visitor) => void;
  onCancel: () => void;
}

export function VisitorForm({ visitor, onSave, onCancel }: VisitorFormProps) {
  const [formData, setFormData] = useState<Partial<Visitor>>(
    visitor || {
      name: '',
      idNumber: '',
      relationship: '',
      status: 'active',
      contactInfo: {
        phone: '',
        email: '',
        address: '',
      },
      notes: '',
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: visitor?.id || String(Math.random()),
      documents: visitor?.documents || [],
      updatedAt: new Date().toISOString(),
    } as Visitor);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateContactInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {visitor ? 'Modifier le visiteur' : 'Ajouter un visiteur'}
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
                placeholder="Nom du visiteur"
              />
            </div>

            <div className="space-y-2">
              <Label>Numéro d'identification</Label>
              <Input
                required
                value={formData.idNumber}
                onChange={(e) => updateFormData('idNumber', e.target.value)}
                placeholder="Numéro d'identification"
              />
            </div>

            <div className="space-y-2">
              <Label>Relation</Label>
              <Input
                required
                value={formData.relationship}
                onChange={(e) => updateFormData('relationship', e.target.value)}
                placeholder="Relation avec le détenu"
              />
            </div>

            <div className="space-y-2">
              <Label>Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Visitor['status']) =>
                  updateFormData('status', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="suspended">Suspendu</SelectItem>
                  <SelectItem value="blocked">Bloqué</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input
                required
                value={formData.contactInfo?.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                placeholder="Numéro de téléphone"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.contactInfo?.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
                placeholder="Adresse email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Adresse</Label>
            <Input
              value={formData.contactInfo?.address}
              onChange={(e) => updateContactInfo('address', e.target.value)}
              placeholder="Adresse postale"
            />
          </div>

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
              {visitor ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}