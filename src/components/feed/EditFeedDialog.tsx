import { FC, KeyboardEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import type { Feed } from '@/types';
import { useToast } from '../ui/use-toast';

interface EditFeedDialogProps {
  feed: Feed | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => Promise<void>;
}

interface FormValues {
  content: string;
}

export const EditFeedDialog: FC<EditFeedDialogProps> = ({
  feed,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      content: feed?.content || '',
    },
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (isOpen) {
      form.setFocus('content');
      // Timeout para asegurarme que el focus se haga al final
      setTimeout(() => {
        const textarea = document.querySelector(
          'textarea[name="content"]'
        ) as HTMLTextAreaElement;
        if (textarea) {
          const length = textarea.value.length;
          textarea.setSelectionRange(length, length);
        }
      }, 0);
    }
  }, [isOpen, form]);

  if (!feed) return null;

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values.content);
    form.reset();
    toast({
      title: 'Publicación actualizada',
      description: 'Los cambios han sido guardados exitosamente.',
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='shadow-glow sm:max-w-md md:max-w-xl'>
        <DialogHeader>
          <div className='flex items-center space-x-3'>
            <div className='h-10 w-10 overflow-hidden rounded-full'>
              <img
                src={feed.author.avatar}
                alt={feed.author.name}
                className='h-full w-full object-cover'
              />
            </div>
            <div>
              <DialogTitle className='text-left'>
                {feed.author.name}
              </DialogTitle>
              <DialogDescription className='text-sm text-winter-text'>
                Editar publicación
                <span className='ml-1 text-[9px] opacity-0 md:opacity-100'>
                  (Presiona {/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl'}{' '}
                  + Enter para guardar)
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='content'
              rules={{
                required: 'El contenido es requerido',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className='h-[100px] min-h-[100px] resize-none border-winter-border text-neutral-50'
                      onKeyDown={handleKeyDown}
                      maxLength={255}
                      {...field}
                    />
                  </FormControl>
                  <div className='text-right text-sm text-neutral-50'>
                    {field.value.length}/255
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3'>
              <Button variant='outline' type='button' onClick={onClose}>
                Cancelar
              </Button>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
