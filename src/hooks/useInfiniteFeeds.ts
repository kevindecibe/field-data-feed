import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeeds } from '@/lib/api';

/**
 * Hook personalizado que gestiona la carga infinita de feeds utilizando React Query.
 * Maneja la paginación y el estado de carga de manera automática.
 * @returns Un objeto con los datos de los feeds, estados de carga y funciones para
 * gestionar la paginación infinita.
 */
export function useInfiniteFeeds() {
  return useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }) => fetchFeeds(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}
