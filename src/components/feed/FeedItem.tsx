import { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/utils/date';
import { Dot } from 'lucide-react';
import { Actions } from './Actions';
import type { Feed } from '@/types';

interface FeedItemProps {
  feed: Feed;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const FeedItem: FC<FeedItemProps> = ({ feed, onEdit, onDelete }) => {
  const { id, author, content, date } = feed;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='flex items-center space-x-3 text-slate-300'>
          <div className='h-10 w-10 overflow-hidden rounded-full'>
            <img
              src={author.avatar}
              alt={author.name}
              className='h-full w-full object-cover'
            />
          </div>
          <div className='flex h-10 flex-col sm:flex-row sm:items-center sm:gap-1'>
            <h3 className='text-lg font-bold'>{author.name}</h3>
            <Dot className='hidden sm:block' />
            <p className='text-sm'>{formatDate(date)}</p>
          </div>
        </div>
        {onEdit && onDelete && (
          <Actions id={id} onEdit={onEdit} onDelete={onDelete} />
        )}
      </CardHeader>
      <CardContent>
        <p className='text-sm text-winter-text'>{content}</p>
      </CardContent>
    </Card>
  );
};
