export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type EventsRawData = Record<Event["id"], Omit<Event, "id">>;
