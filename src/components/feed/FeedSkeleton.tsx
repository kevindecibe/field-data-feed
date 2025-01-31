import { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const FeedSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='flex items-center space-x-3'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[120px]' />
            <Skeleton className='h-3 w-[80px]' />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='mt-2 h-4 w-[80%]' />
      </CardContent>
    </Card>
  );
};
