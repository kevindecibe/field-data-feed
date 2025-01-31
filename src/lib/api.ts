import type { Feed, FeedResponse } from '@/types';

export async function fetchFeeds(cursor?: string): Promise<FeedResponse> {
  const params = new URLSearchParams();
  if (cursor) params.set('cursor', cursor);
  params.set('limit', '10');

  const response = await fetch(`/api/feeds?${params}`);
  if (!response.ok) throw new Error('Error fetching feeds');

  return response.json();
}

export async function updateFeed(id: string, content: string): Promise<Feed> {
  const response = await fetch(`/api/feeds/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) throw new Error('Error updating feed');
  return response.json();
}

export async function deleteFeed(id: string): Promise<void> {
  const response = await fetch(`/api/feeds/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error deleting feed');
}
