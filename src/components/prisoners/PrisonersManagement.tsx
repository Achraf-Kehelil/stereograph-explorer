import { useState } from 'react';
import { Prisoner } from '@/types';
import { mockPrisoners } from '@/data/mockData';
import { PrisonersList } from './PrisonersList';
import { PrisonerForm } from './PrisonerForm';
import { PrisonerProfile } from '@/components/profiles/PrisonerProfile';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useProfiles } from '@/lib/profiles';

export function PrisonersManagement() {
  const [prisoners, setPrisoners] = useState<Prisoner[]>(mockPrisoners);
  const [selectedPrisoner, setSelectedPrisoner] = useState<Prisoner | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { prisonerCalls } = useProfiles();

  const handleSavePrisoner = (prisoner: Prisoner) => {
    if (selectedPrisoner) {
      setPrisoners(prisoners.map((p) => (p.id === prisoner.id ? prisoner : p)));
    } else {
      setPrisoners([...prisoners, { ...prisoner, id: String(prisoners.length + 1) }]);
    }
    setIsFormOpen(false);
    setSelectedPrisoner(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des détenus</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un détenu
        </Button>
      </div>

      {selectedPrisoner ? (
        <>
          <Button
            variant="ghost"
            onClick={() => setSelectedPrisoner(null)}
            className="mb-4"
          >
            ← Retour à la liste
          </Button>
          <PrisonerProfile
            prisoner={selectedPrisoner}
            calls={prisonerCalls}
            onEditPrisoner={(prisoner) => {
              setSelectedPrisoner(prisoner);
              setIsFormOpen(true);
            }}
          />
        </>
      ) : (
        <Card className="p-4">
          <PrisonersList
            prisoners={prisoners}
            onSelectPrisoner={setSelectedPrisoner}
          />
        </Card>
      )}

      {isFormOpen && (
        <PrisonerForm
          prisoner={selectedPrisoner}
          onSave={handleSavePrisoner}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedPrisoner(null);
          }}
        />
      )}
    </div>
  );
}