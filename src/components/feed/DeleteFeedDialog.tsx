import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '../ui/use-toast';

interface DeleteFeedDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteFeedDialog: FC<DeleteFeedDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const { toast } = useToast();

  const handleConfirm = () => {
    onConfirm();
    toast({
      title: 'Publicación eliminada',
      description: 'La publicación ha sido eliminada permanentemente.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className='shadow-glow sm:max-w-md'>
        <DialogHeader className='h-12'>
          <DialogTitle>Estás seguro?</DialogTitle>
          <DialogDescription className='my-auto text-sm text-neutral-50'>
            <span>
              Esta acción no se puede deshacer. La publicación será eliminada
              permanentemente.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className='mt-6 flex justify-end gap-3'>
          <Button
            className='absolute -top-[1070px] cursor-default opacity-0'
            variant='outline'
          ></Button>
          <Button variant='outline' type='button' onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant='destructive' onClick={handleConfirm}>
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
