export interface Feed {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
}

export interface FeedResponse {
  items: Feed[];
  nextCursor?: string;
}
