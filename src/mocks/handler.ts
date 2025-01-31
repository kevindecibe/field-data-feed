import { http, HttpResponse, delay } from 'msw';
import type { Feed, FeedResponse } from '@/types';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

const STORAGE_KEY = 'mock_feeds';

const avatar1 = createAvatar(identicon, {
  seed: 'Jack',
});

const avatar2 = createAvatar(identicon, {
  seed: 'Jude',
});
const avatar3 = createAvatar(identicon, {
  seed: 'Sawyer',
});
const avatar4 = createAvatar(identicon, {
  seed: 'Emery',
});
const avatar5 = createAvatar(identicon, {
  seed: 'Luis',
});

const SAMPLE_NAMES = [
  'Lucas Larrea',
  'Emma Thompson',
  'Eva Lopez',
  'Sofia Rodriguez',
  'Michael Chen',
  'Sarah Ahmed',
  'David Kim',
  'Maria Garcia',
  'John Smith',
  'Lisa Wong',
];

const SAMPLE_AVATARS = [
  avatar1.toDataUri(),
  avatar2.toDataUri(),
  avatar3.toDataUri(),
  avatar4.toDataUri(),
  avatar5.toDataUri(),
];

const generateRandomDate = () => {
  const start = new Date(2024, 0, 1).getTime();
  const end = new Date().getTime();
  return new Date(start + Math.random() * (end - start)).toISOString();
};

const loadFeedsFromStorage = (): Feed[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveFeedsToStorage = (feeds: Feed[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feeds));
};

let MOCK_FEEDS: Feed[] = loadFeedsFromStorage();

if (MOCK_FEEDS.length === 0) {
  MOCK_FEEDS = Array.from({ length: 500 }, (_, index) => ({
    id: (index + 1).toString(),
    author: {
      name: SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)],
      avatar: SAMPLE_AVATARS[Math.floor(Math.random() * SAMPLE_AVATARS.length)],
    },
    content: `This is feed item ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    date: generateRandomDate(),
  }));
  saveFeedsToStorage(MOCK_FEEDS);
}

interface UpdateFeedRequest {
  content: string;
}

export const handlers = [
  http.get('/api/feeds', async ({ request }) => {
    await delay(2000);

    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit') || 10);

    // Ordeno feeds por fecha descendente
    const sortedFeeds = [...MOCK_FEEDS].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const startIndex = cursor ? Number(cursor) : 0;
    const items = sortedFeeds.slice(startIndex, startIndex + limit);
    const nextCursor =
      startIndex + limit < sortedFeeds.length
        ? String(startIndex + limit)
        : undefined;

    return HttpResponse.json<FeedResponse>({
      items,
      nextCursor,
    });
  }),

  http.delete('/api/feeds/:id', ({ params }) => {
    const { id } = params;
    MOCK_FEEDS = MOCK_FEEDS.filter((feed) => feed.id !== id);
    saveFeedsToStorage(MOCK_FEEDS);
    return new HttpResponse(null, { status: 200 });
  }),

  http.patch('/api/feeds/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as UpdateFeedRequest;

    const feedIndex = MOCK_FEEDS.findIndex((feed) => feed.id === id);
    if (feedIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    MOCK_FEEDS[feedIndex] = {
      ...MOCK_FEEDS[feedIndex],
      content: body.content,
      date: new Date().toISOString(),
    };
    saveFeedsToStorage(MOCK_FEEDS);

    return HttpResponse.json(MOCK_FEEDS[feedIndex]);
  }),
];
