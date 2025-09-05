import API from "./api";
import { retryApiCall } from "../utils/retryUtils";
import {
  CreateEventDto,
  UpdateEventDto,
  EventResponse,
  EventsResponse,
  Event,
} from "../types/Types";

const eventCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

const pendingRequests = new Map<string, Promise<any>>();

function cleanExpiredCache() {
  const now = Date.now();
  for (const [key, value] of eventCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      eventCache.delete(key);
    }
  }
}

function getCachedData<T>(key: string): T | null {
  cleanExpiredCache();
  const cached = eventCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
}

function setCachedData<T>(key: string, data: T) {
  eventCache.set(key, { data, timestamp: Date.now() });
}

export const createEvent = async (
  data: CreateEventDto
): Promise<EventResponse> => {
  const response = await retryApiCall(() => API.post("/events", data));

  eventCache.clear();
  return response.data;
};

export const getEvents = async (): Promise<EventsResponse> => {
  const cacheKey = "allEvents";

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const cachedData = getCachedData<EventsResponse>(cacheKey);
  if (cachedData) {
    retryApiCall(() => API.get("/events"))
      .then((response) => {
        setCachedData(cacheKey, response.data);
        pendingRequests.delete(cacheKey);
      })
      .catch((error) => {
        pendingRequests.delete(cacheKey);
        console.error("Background refresh failed:", error);
      });

    return Promise.resolve(cachedData);
  }

  const requestPromise = retryApiCall(() => API.get("/events"))
    .then((response) => {
      setCachedData(cacheKey, response.data);
      pendingRequests.delete(cacheKey);
      return response.data;
    })
    .catch((error) => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

export const getUserEvents = async (): Promise<EventsResponse> => {
  const cacheKey = "userEvents";

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const cachedData = getCachedData<EventsResponse>(cacheKey);
  if (cachedData) {
    retryApiCall(() => API.get("/events/my-events"))
      .then((response) => {
        setCachedData(cacheKey, response.data);
        pendingRequests.delete(cacheKey);
      })
      .catch((error) => {
        pendingRequests.delete(cacheKey);
        console.error("Background refresh failed:", error);
      });

    return Promise.resolve(cachedData);
  }

  const requestPromise = retryApiCall(() => API.get("/events/my-events"))
    .then((response) => {
      setCachedData(cacheKey, response.data);
      pendingRequests.delete(cacheKey);
      return response.data;
    })
    .catch((error) => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

export const getEvent = async (id: string): Promise<Event> => {
  const cacheKey = `event_${id}`;

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const cachedData = getCachedData<Event>(cacheKey);
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  const requestPromise = retryApiCall(() => API.get(`/events/${id}`))
    .then((response) => {
      setCachedData(cacheKey, response.data);
      pendingRequests.delete(cacheKey);
      return response.data;
    })
    .catch((error) => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

export const updateEvent = async (
  id: string,
  data: UpdateEventDto
): Promise<EventResponse> => {
  const response = await retryApiCall(() => API.patch(`/events/${id}`, data));

  eventCache.delete(`event_${id}`);
  eventCache.delete("allEvents");
  eventCache.delete("userEvents");
  return response.data;
};

export const deleteEvent = async (id: string): Promise<{ message: string }> => {
  const response = await retryApiCall(() => API.delete(`/events/${id}`));

  eventCache.delete(`event_${id}`);
  eventCache.delete("allEvents");
  eventCache.delete("userEvents");
  return response.data;
};

export const rsvpEvent = async (id: string): Promise<EventResponse> => {
  const response = await retryApiCall(() => API.post(`/events/${id}/rsvp`, {}));

  eventCache.delete(`event_${id}`);
  eventCache.delete("allEvents");
  eventCache.delete("userEvents");
  return response.data;
};

export const clearEventCache = (id: string) => {
  eventCache.delete(`event_${id}`);
};

export const clearAllEventCache = () => {
  for (const key of eventCache.keys()) {
    if (
      key.startsWith("event_") ||
      key === "allEvents" ||
      key === "userEvents"
    ) {
      eventCache.delete(key);
    }
  }
};
