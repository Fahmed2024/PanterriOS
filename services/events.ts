import { EventFilters, EventsRes } from '@/interface';
import { CRAWLER_API } from '@/services/axios';

export const retriveEvents = async (
  params: EventFilters,
): Promise<EventsRes> => {
  const { data } = await CRAWLER_API.get('/events', { params });
  return data;
};
