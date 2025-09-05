import {
  getEvent,
  getEvents,
  getUserEvents,
  clearEventCache,
  clearAllEventCache,
} from "../apis/eventsOptimized";

jest.mock("../utils/retryUtils", () => ({
  retryApiCall: jest.fn((fn) => fn()),
}));

// Mock the API
jest.mock("../apis/api", () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    },
  };
});

describe("Event API Caching", () => {
  const mockEvent = {
    id: "1",
    title: "Test Event",
    description: "Test Description",
    date: "2023-01-01",
    location: "Test Location",
    category: "Conference",
    isUserCreated: false,
    rsvpCount: 0,
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  };

  const mockEventsResponse = {
    data: [mockEvent],
    total: 1,
  };

  const mockApiResponse = {
    data: mockEvent,
  };

  const mockEventsApiResponse = {
    data: mockEventsResponse,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    clearAllEventCache();

    const api = require("../apis/api").default;
    api.get.mockImplementation((url: string) => {
      if (url.includes("/events/1")) {
        return Promise.resolve(mockApiResponse);
      } else if (url.includes("/events/my-events")) {
        return Promise.resolve(mockEventsApiResponse);
      } else if (url.includes("/events")) {
        return Promise.resolve(mockEventsApiResponse);
      }
      return Promise.reject(new Error("Not found"));
    });
  });

  test("should cache event data", async () => {
    const api = require("../apis/api").default;

    await getEvent("1");
    expect(api.get).toHaveBeenCalledTimes(1);

    await getEvent("1");
    expect(api.get).toHaveBeenCalledTimes(1);
  }, 10000);

  test("should cache events list", async () => {
    const api = require("../apis/api").default;

    await getEvents();
    expect(api.get).toHaveBeenCalledTimes(1);

    await getEvents();
    expect(api.get).toHaveBeenCalledTimes(1);
  }, 10000);

  test("should cache user events list", async () => {
    const api = require("../apis/api").default;

    await getUserEvents();
    expect(api.get).toHaveBeenCalledTimes(1);

    await getUserEvents();
    expect(api.get).toHaveBeenCalledTimes(1);
  }, 10000);

  test("should clear specific event cache", async () => {
    const api = require("../apis/api").default;

    await getEvent("1");
    expect(api.get).toHaveBeenCalledTimes(1);

    clearEventCache("1");
    await getEvent("1");
    expect(api.get).toHaveBeenCalledTimes(2);
  }, 10000);

  test("should clear all event cache", async () => {
    const api = require("../apis/api").default;

    await getEvent("1");
    await getEvents();
    await getUserEvents();
    expect(api.get).toHaveBeenCalledTimes(3);

    clearAllEventCache();

    await getEvent("1");
    await getEvents();
    await getUserEvents();
    expect(api.get).toHaveBeenCalledTimes(6);
  }, 10000);
});
