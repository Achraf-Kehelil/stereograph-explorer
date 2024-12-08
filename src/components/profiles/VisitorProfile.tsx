import { useState } from 'react';
import { Visitor, CallRecord } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import { DocumentList } from './DocumentList';
import { CallHistory } from './CallHistory';

interface VisitorProfileProps {
  visitor: Visitor;
  calls: CallRecord[];
  onEditVisitor: (visitor: Visitor) => void;
}

export function VisitorProfile({ visitor, calls, onEditVisitor }: VisitorProfileProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'calls' | 'documents'>('info');

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
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{visitor.name}</h2>
            <p className="text-sm text-gray-500">ID: {visitor.idNumber}</p>
          </div>
          <Button onClick={() => onEditVisitor(visitor)}>Edit Profile</Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="mt-1">{getStatusBadge(visitor.status)}</div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Relationship</p>
            <p className="mt-1 font-medium">{visitor.relationship}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="mt-1 font-medium">{formatDateTime(visitor.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="mt-1 font-medium">{formatDateTime(visitor.updatedAt)}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Contact Information</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-gray-400" />
              <span>{visitor.contactInfo.phone}</span>
            </div>
            {visitor.contactInfo.email && (
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-gray-400" />
                <span>{visitor.contactInfo.email}</span>
              </div>
            )}
            {visitor.contactInfo.address && (
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                <span>{visitor.contactInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {visitor.notes && (
          <div className="mt-6">
            <h3 className="font-semibold">Notes</h3>
            <p className="mt-2 text-sm">{visitor.notes}</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === 'info'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Information
            </button>
            <button
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === 'calls'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('calls')}
            >
              Call History
            </button>
            <button
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === 'documents'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'calls' && (
            <CallHistory calls={calls} />
          )}

          {activeTab === 'documents' && (
            <DocumentList documents={visitor.documents} />
          )}
        </div>
      </Card>
    </div>
  );
}