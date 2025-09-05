import {
  getEvent,
  getEvents,
  getUserEvents,
  clearEventCache,
  clearAllEventCache,
} from "../apis/eventsOptimized";
import API from "../apis/api";
import { AxiosInstance } from "axios";

// Define type for the mocked API
type MockedAPI = AxiosInstance & {
  get: jest.Mock;
  post: jest.Mock;
  patch: jest.Mock;
  delete: jest.Mock;
};

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

  // Store reference to the mocked API
  let mockedAPI: MockedAPI;

  beforeEach(() => {
    jest.clearAllMocks();
    clearAllEventCache();

    mockedAPI = API as MockedAPI;
    mockedAPI.get.mockImplementation((url: string) => {
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
    // Don't clear the mock implementation, just reset call count
    mockedAPI.get.mockClear();

    await getEvent("1");
    expect(mockedAPI.get).toHaveBeenCalledTimes(1);

    await getEvent("1");
    expect(mockedAPI.get).toHaveBeenCalledTimes(1);
  }, 10000);

  test("should cache events list", async () => {
    // Don't clear the mock implementation, just reset call count
    mockedAPI.get.mockClear();

    await getEvents();
    expect(mockedAPI.get).toHaveBeenCalledTimes(1);

    await getEvents();
    expect(mockedAPI.get).toHaveBeenCalledTimes(1);
  }, 10000);

  test("should cache user events list", async () => {
    // Don't clear the mock implementation, just reset call count
    mockedAPI.get.mockClear();

    await getUserEvents();
    expect(mockedAPI.get).toHaveBeenCalledTimes(1);

    await getUserEvents();
    expect(mockedAPI.get).toHaveBeenCalledTimes(1);
  }, 10000);

  test("should clear specific event cache", async () => {
    // Don't clear the mock implementation, just reset call count
    mockedAPI.get.mockClear();

    await getEvent("1");
    expect(mockedAPI.get).toHaveBeenCalledTimes(1);

    clearEventCache("1");
    await getEvent("1");
    expect(mockedAPI.get).toHaveBeenCalledTimes(2);
  }, 10000);

  test("should clear all event cache", async () => {
    // Don't clear the mock implementation, just reset call count
    mockedAPI.get.mockClear();

    await getEvent("1");
    await getEvents();
    await getUserEvents();
    expect(mockedAPI.get).toHaveBeenCalledTimes(3);

    clearAllEventCache();

    await getEvent("1");
    await getEvents();
    await getUserEvents();
    expect(mockedAPI.get).toHaveBeenCalledTimes(6);
  }, 10000);
});
