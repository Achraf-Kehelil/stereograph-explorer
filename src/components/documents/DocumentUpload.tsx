import { useState } from 'react';
import { Document } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface DocumentUploadProps {
  onUpload: (document: Document) => void;
  onCancel: () => void;
}

export function DocumentUpload({ onUpload, onCancel }: DocumentUploadProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Document['type']>('other');
  const [file, setFile] = useState<File | null>(null);
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const newDocument: Document = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      type,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadedBy: 'current-user',
      uploadedAt: new Date().toISOString(),
      status: 'valid',
      expiresAt: expiryDate || undefined,
    };

    onUpload(newDocument);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Titre</Label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du document"
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={type}
              onValueChange={(value: Document['type']) => setType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="authorization">Autorisation</SelectItem>
                <SelectItem value="id">Pièce d'identité</SelectItem>
                <SelectItem value="report">Rapport</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fichier</Label>
            <Input
              required
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label>Date d'expiration (optionnel)</Label>
            <Input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}