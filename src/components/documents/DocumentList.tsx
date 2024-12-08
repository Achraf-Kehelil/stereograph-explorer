import { Document } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Clock, Trash2 } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface DocumentListProps {
  documents: Document[];
  onDelete?: (id: string) => void;
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  const getStatusBadge = (status: Document['status']) => {
    const variants = {
      valid: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      revoked: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: Document['type']) => {
    const variants = {
      authorization: 'bg-blue-100 text-blue-800',
      id: 'bg-purple-100 text-purple-800',
      report: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge className={variants[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun document trouvé
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Card key={document.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <h4 className="font-medium">{document.title}</h4>
                <p className="text-sm text-gray-500">{document.fileName}</p>
                <div className="mt-2 flex items-center space-x-2">
                  {getStatusBadge(document.status)}
                  {getTypeBadge(document.type)}
                  <span className="text-sm text-gray-500">
                    Ajouté le {formatDateTime(document.uploadedAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {document.expiresAt && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  Expire le {formatDateTime(document.expiresAt)}
                </div>
              )}
              <Button size="sm" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(document.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}