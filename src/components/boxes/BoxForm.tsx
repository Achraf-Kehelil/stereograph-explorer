import { useForm } from 'react-hook-form';
import { Box } from '@/types';
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

interface BoxFormProps {
  box?: Box | null;
  onSave: (box: Box) => void;
  onCancel: () => void;
}

export function BoxForm({ box, onSave, onCancel }: BoxFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Box>({
    defaultValues: box || {
      name: '',
      status: 'available',
      visitorPhone: '',
      prisonerPhone: '',
    },
  });

  const status = watch('status');

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{box ? 'Edit Box' : 'Add New Box'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Box Name</Label>
            <Input
              id="name"
              {...register('name', { required: 'Box name is required' })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value: Box['status']) => setValue('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitorPhone">Visitor Phone</Label>
            <Input
              id="visitorPhone"
              {...register('visitorPhone', { required: 'Visitor phone is required' })}
            />
            {errors.visitorPhone && (
              <p className="text-sm text-red-500">{errors.visitorPhone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prisonerPhone">Prisoner Phone</Label>
            <Input
              id="prisonerPhone"
              {...register('prisonerPhone', { required: 'Prisoner phone is required' })}
            />
            {errors.prisonerPhone && (
              <p className="text-sm text-red-500">{errors.prisonerPhone.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}