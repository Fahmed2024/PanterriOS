export interface EventsRes {
  meta: EventMeta;
  data: Events[];
}

export interface Events {
  _id: string;
  urlHash: string;
  __v: number;
  about: string;
  attendanceMode: string;
  author: string;
  content: string;
  crawlBatchId: string;
  crawledAt: Date;
  createdAt: Date;
  detailsUrl: string;
  endDateTime: Date;
  eventDateTime: Date;
  eventTopic: string;
  eventType: string;
  excerpt: string;
  expectedAttendees: number;
  highlights: string[];
  imageUrl: string;
  isFeatured: boolean;
  isSelected: boolean;
  location: string;
  matchedKeywords: string[];
  organizerFullName: string;
  organizerShortName: string;
  publishedAt: Date;
  registrationUrl: string;
  relevanceScore: number;
  source: EventSource;
  sourceType: string;
  startDateTime: Date;
  status: string;
  title: string;
  updatedAt: Date;
  url: string;
  venueAddress: string;
  venueName: string;
  priceCurrency?: string;
  priceFrom?: 0;
}

export interface EventSource {
  name: string;
  key: string;
  baseUrl: string;
}

export interface EventMeta {
  status_code: number;
  success: boolean;
  pagination: EventsPagination;
}

export interface EventsPagination {
  total_count: number;
  per_page: number;
  current: number;
  current_page: string;
}

export interface EventFilters {
  page?: number;
  per_page?: number;
  search?: string;
  all?: boolean;
  sourceName?: string;
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  slug?: string;
  location?: string;
  category?: string;
  eventType?: string;
  eventDateTime?: Date;
  startDateTime?: Date;
}
