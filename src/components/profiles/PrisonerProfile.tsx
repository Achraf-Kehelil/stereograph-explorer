import { useState } from 'react';
import { Prisoner, Document, CallRecord } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Phone, AlertTriangle, Clock } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import { DocumentList } from './DocumentList';
import { CallHistory } from './CallHistory';

interface PrisonerProfileProps {
  prisoner: Prisoner;
  calls: CallRecord[];
  onEditPrisoner: (prisoner: Prisoner) => void;
}

export function PrisonerProfile({ prisoner, calls, onEditPrisoner }: PrisonerProfileProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'calls' | 'documents'>('info');

  const getStatusBadge = (status: Prisoner['status']) => {
    const variants = {
      incarcerated: 'bg-blue-100 text-blue-800',
      transferred: 'bg-yellow-100 text-yellow-800',
      released: 'bg-green-100 text-green-800',
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
            <h2 className="text-2xl font-bold">{prisoner.name}</h2>
            <p className="text-sm text-gray-500">ID: {prisoner.prisonerId}</p>
          </div>
          <Button onClick={() => onEditPrisoner(prisoner)}>Edit Profile</Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="mt-1">{getStatusBadge(prisoner.status)}</div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cell</p>
            <p className="mt-1 font-medium">{prisoner.cell}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Entry Date</p>
            <p className="mt-1 font-medium">{formatDateTime(prisoner.entryDate)}</p>
          </div>
          {prisoner.releaseDate && (
            <div>
              <p className="text-sm text-gray-500">Release Date</p>
              <p className="mt-1 font-medium">{formatDateTime(prisoner.releaseDate)}</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Visitation Rights</h3>
          <div className="mt-2">
            <Badge className={
              prisoner.visitationRights.status === 'allowed'
                ? 'bg-green-100 text-green-800'
                : prisoner.visitationRights.status === 'restricted'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }>
              {prisoner.visitationRights.status.toUpperCase()}
            </Badge>
          </div>
          {prisoner.visitationRights.restrictions && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Restrictions:</p>
              <ul className="mt-1 list-inside list-disc">
                {prisoner.visitationRights.restrictions.map((restriction, index) => (
                  <li key={index} className="text-sm">{restriction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {prisoner.notes && (
          <div className="mt-6">
            <h3 className="font-semibold">Notes</h3>
            <p className="mt-2 text-sm">{prisoner.notes}</p>
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
          {activeTab === 'info' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Allowed Visitors</h3>
              <div className="grid grid-cols-2 gap-4">
                {prisoner.visitationRights.allowedVisitors.map((visitorId) => (
                  <Card key={visitorId} className="p-4">
                    <p className="font-medium">Visitor ID: {visitorId}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calls' && (
            <CallHistory calls={calls} />
          )}

          {activeTab === 'documents' && (
            <DocumentList documents={prisoner.documents} />
          )}
        </div>
      </Card>
    </div>
  );
}