import { useState } from 'react';
import { Box } from '@/types';
import { mockBoxes } from '@/data/mockData';
import { BoxesList } from './BoxesList';
import { BoxForm } from './BoxForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function BoxesManagement() {
  const [boxes, setBoxes] = useState<Box[]>(mockBoxes);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveBox = (box: Box) => {
    if (selectedBox) {
      setBoxes(boxes.map((b) => (b.id === box.id ? box : b)));
    } else {
      setBoxes([...boxes, { ...box, id: String(boxes.length + 1) }]);
    }
    setIsFormOpen(false);
    setSelectedBox(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Box Management</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Box
        </Button>
      </div>
      <Card className="p-4">
        <BoxesList
          boxes={boxes}
          onEditBox={(box) => {
            setSelectedBox(box);
            setIsFormOpen(true);
          }}
        />
      </Card>
      {isFormOpen && (
        <BoxForm
          box={selectedBox}
          onSave={handleSaveBox}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedBox(null);
          }}
        />
      )}
    </div>
  );
}