import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FeedItem } from './FeedItem';
import { FeedSkeleton } from './FeedSkeleton';
import { useInfiniteFeeds } from '@/hooks/useInfiniteFeeds';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeed, updateFeed } from '@/lib/api';
import { DeleteFeedDialog } from './DeleteFeedDialog';
import { EditFeedDialog } from './EditFeedDialog';
import type { Feed as FeedType } from '@/types';
import { motion } from 'framer-motion';
import { AnimatedPresence } from '../ui/animated-presence';
import { AnimatedItem } from '../ui/animated-item';
import { useSkeletonCount } from '@/hooks/useSkeletonCount';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Feed: FC = () => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const [feedToDelete, setFeedToDelete] = useState<string | null>(null);
  const [feedToEdit, setFeedToEdit] = useState<FeedType | null>(null);
  const skeletonCount = useSkeletonCount();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteFeeds();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const deleteMutation = useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

  const handleDelete = (id: string) => {
    setFeedToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (feedToDelete) {
      await deleteMutation.mutateAsync(feedToDelete);
      setFeedToDelete(null);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (variables: { id: string; content: string }) =>
      updateFeed(variables.id, variables.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

  const handleEdit = (id: string) => {
    const feed = data?.pages
      .flatMap((page) => page.items)
      .find((item) => item.id === id);
    if (feed) setFeedToEdit(feed);
  };

  const handleEditSubmit = async (content: string) => {
    if (feedToEdit) {
      await updateMutation.mutateAsync({
        id: feedToEdit.id,
        content,
      });
      setFeedToEdit(null);
    }
  };

  if (status === 'pending') {
    return (
      <motion.div
        className='animate-pulse space-y-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <FeedSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  if (status === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='rounded-lg border border-red-200 bg-red-50 p-4 text-red-600'
      >
        Error cargando los feeds. Por favor, intenta de nuevo.
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='w-full space-y-4'
        transition={{ duration: 1.6 }}
      >
        <AnimatedPresence>
          {data.pages.map((page) =>
            page.items.map((feed) => (
              <AnimatedItem key={feed.id}>
                <FeedItem
                  feed={feed}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </AnimatedItem>
            ))
          )}
        </AnimatedPresence>

        <div>
          {isFetchingNextPage && <FeedSkeleton />}
          {hasNextPage && <div ref={ref} className='h-8' aria-hidden='true' />}
        </div>
      </motion.div>

      <DeleteFeedDialog
        isOpen={!!feedToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setFeedToDelete(null)}
      />

      <EditFeedDialog
        key={feedToEdit?.id}
        feed={feedToEdit}
        isOpen={!!feedToEdit}
        onClose={() => setFeedToEdit(null)}
        onSubmit={handleEditSubmit}
      />
    </>
  );
};
