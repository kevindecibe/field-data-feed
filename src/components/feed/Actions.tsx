import { FC } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  id: string;
}

export const Actions: FC<ActionsProps> = ({ onEdit, onDelete, id }) => {
  return (
    <>
      {/* Desktop version */}
      <div className='hidden space-x-2 sm:flex'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Pencil
                className='h-4 cursor-pointer text-winter-border'
                onClick={() => onEdit(id)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar publicación</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Trash2
                className='h-4 cursor-pointer text-red-300'
                onClick={() => onDelete(id)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Eliminar publicación</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Mobile version */}
      <div className='sm:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger className='rounded-full bg-transparent p-2 text-winter-border focus:border-none'>
            <MoreVertical className='h-4 w-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={1}
            className='border border-winter-border bg-winter-primary'
          >
            <DropdownMenuItem
              onClick={() => onEdit(id)}
              className='text-winter-text hover:bg-winter-shadow focus:bg-winter-shadow'
            >
              <Pencil className='mr-2 h-4 text-winter-border' />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className='text-winter-text hover:bg-winter-shadow focus:bg-winter-shadow'
            >
              <Trash2 className='mr-2 h-4 text-red-300' />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
