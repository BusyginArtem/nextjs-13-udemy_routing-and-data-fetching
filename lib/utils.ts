import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ImageLoader } from "next/image";

import { EventsRawData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertEventsToArray(events: EventsRawData) {
  return Array.from(Object.keys(events), (k) => ({
    id: k,
    ...events[k],
  }));
}

export const imageLoader: ImageLoader = (config) => {
  const { src, quality } = config;

  const srcPaths = src.split("upload/");
  const urlStart = srcPaths[0];
  const urlEnd = srcPaths[1];
  const transformations = `h_200,q_${quality}`;

  return `${urlStart}upload/${transformations}/${urlEnd}`;
};
