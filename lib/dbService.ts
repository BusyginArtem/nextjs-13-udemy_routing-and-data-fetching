import { db } from "@/lib/firebaseAdmin";
import { Event } from "./types";
import { convertEventsToArray } from "./utils";

export async function getAllEvents(pageSize: number = 5, startAfter: string | null = null): Promise<Event[]> {
  let ref = db.ref("/events").orderByChild("date").limitToFirst(pageSize);
  let events: Event[] = [];

  if (startAfter) {
    ref = ref.startAfter(startAfter);
  }

  const snapshot = await ref.once("value");

  if (snapshot.exists()) {
    const data = snapshot.val();

    events = convertEventsToArray(data);
  }

  return events;
}

export async function getFeaturedEvents(pageSize: number = 5, startAfter: string | null = null): Promise<Event[]> {
  let ref = db.ref("/events").orderByChild("isFeatured").equalTo(true).limitToFirst(pageSize);

  let events: Event[] = [];

  if (startAfter) {
    ref = ref.startAfter(startAfter);
  }

  const snapshot = await ref.once("value");

  if (snapshot.exists()) {
    const data = snapshot.val();

    events = convertEventsToArray(data);
  }

  return events;
}

export async function getEventById({ id }: { id: string }): Promise<Event | null> {
  const ref = db.ref("/events");

  let event: Event | null = null;

  const snapshot = await ref.child(id).once("value");

  if (snapshot.exists()) {
    const data = snapshot.val();

    event = data;
  }

  return event;
}

export async function getFilteredEvents({ year, month }: { year: string; month: string }): Promise<Event[]> {
  const ref = db.ref("/events");
  let events: Event[] = [];

  const paddedMonth = Number(month) < 10 ? `0${month}` : month;

  const startDate = `${year}-${paddedMonth}-01`;
  const endDate = `${year}-${paddedMonth}-31`;

  const snapshot = await ref.orderByChild("date").startAt(startDate).endAt(endDate).once("value");

  if (snapshot.exists()) {
    const data = snapshot.val();

    events = convertEventsToArray(data);
  }

  return events;
}
