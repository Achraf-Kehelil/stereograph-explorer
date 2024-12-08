import { useState } from 'react';
import { Visitor } from '@/types';
import { mockVisitors } from '@/data/mockData';
import { VisitorsList } from './VisitorsList';
import { VisitorForm } from './VisitorForm';
import { VisitorProfile } from '@/components/profiles/VisitorProfile';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useProfiles } from '@/lib/profiles';

export function VisitorsManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { visitorCalls } = useProfiles();

  const handleSaveVisitor = (visitor: Visitor) => {
    if (selectedVisitor) {
      setVisitors(visitors.map((v) => (v.id === visitor.id ? visitor : v)));
    } else {
      setVisitors([...visitors, { ...visitor, id: String(visitors.length + 1) }]);
    }
    setIsFormOpen(false);
    setSelectedVisitor(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des visiteurs</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un visiteur
        </Button>
      </div>

      {selectedVisitor ? (
        <>
          <Button
            variant="ghost"
            onClick={() => setSelectedVisitor(null)}
            className="mb-4"
          >
            ← Retour à la liste
          </Button>
          <VisitorProfile
            visitor={selectedVisitor}
            calls={visitorCalls}
            onEditVisitor={(visitor) => {
              setSelectedVisitor(visitor);
              setIsFormOpen(true);
            }}
          />
        </>
      ) : (
        <Card className="p-4">
          <VisitorsList
            visitors={visitors}
            onSelectVisitor={setSelectedVisitor}
          />
        </Card>
      )}

      {isFormOpen && (
        <VisitorForm
          visitor={selectedVisitor}
          onSave={handleSaveVisitor}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedVisitor(null);
          }}
        />
      )}
    </div>
  );
}