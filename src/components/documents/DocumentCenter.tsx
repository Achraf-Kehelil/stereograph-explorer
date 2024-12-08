import { useState } from 'react';
import { Document } from '@/types';
import { DocumentList } from './DocumentList';
import { DocumentUpload } from './DocumentUpload';
import { DocumentFilter } from './DocumentFilter';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function DocumentCenter() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    search: '',
  });

  const handleUpload = (newDocument: Document) => {
    setDocuments([newDocument, ...documents]);
    setIsUploadOpen(false);
  };

  const filteredDocuments = documents.filter((doc) => {
    if (filters.type && doc.type !== filters.type) return false;
    if (filters.status && doc.status !== filters.status) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        doc.title.toLowerCase().includes(searchLower) ||
        doc.fileName.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Centre de documents</h2>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      <Card className="p-4">
        <DocumentFilter filters={filters} onFiltersChange={setFilters} />
      </Card>

      <Card className="p-4">
        <DocumentList documents={filteredDocuments} />
      </Card>

      {isUploadOpen && (
        <DocumentUpload
          onUpload={handleUpload}
          onCancel={() => setIsUploadOpen(false)}
        />
      )}
    </div>
  );
}