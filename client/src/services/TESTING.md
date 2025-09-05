# Testing Guide

This document explains how to run tests for the API services.

## Prerequisites

Make sure you have Jest installed. If not, install it:

```bash
npm install --save-dev jest @types/jest
```

Or with yarn:

```bash
yarn add --dev jest @types/jest
```

## Running Tests

To run all tests:

```bash
npm test
```

Or with yarn:

```bash
yarn test
```

To run tests in watch mode:

```bash
npm test -- --watch
```

Or with yarn:

```bash
yarn test --watch
```

## Test Structure

Tests are located in the `__tests__` directory and follow the pattern:

- `cache.test.ts` - Tests for the caching functionality
- `retry.test.ts` - Tests for the retry mechanism (to be implemented)

## What's Tested

1. **Caching Functionality**

   - Cache hits and misses
   - Cache expiration
   - Manual cache clearing

2. **API Call Deduplication**

   - Prevention of duplicate simultaneous requests

3. **Retry Mechanism**
   - Exponential backoff implementation
   - Retry limits

## Writing New Tests

When adding new tests, follow these guidelines:

1. Place test files in the `__tests__` directory
2. Use descriptive test names
3. Test both success and error cases
4. Clear mocks and cache between tests
5. Use meaningful assertions

## Example Test

```typescript
import { getEvent } from "../apis/eventsOptimized";

jest.mock("../apis/api", () => ({
  default: {
    get: jest.fn(),
  },
}));

describe("Event API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch event data", async () => {
    const mockEvent = { id: "1", title: "Test Event" };
    const api = require("../apis/api").default;
    api.get.mockResolvedValue({ data: mockEvent });

    const event = await getEvent("1");

    expect(event).toEqual(mockEvent);
    expect(api.get).toHaveBeenCalledWith("/events/1");
  });
});
```
