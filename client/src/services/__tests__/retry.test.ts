import { retryWithBackoff, retryApiCall } from "../utils/retryUtils";

describe("Retry Utilities", () => {
  test("should retry failed function calls", async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error("First failure"))
      .mockRejectedValueOnce(new Error("Second failure"))
      .mockResolvedValue("Success");

    const result = await retryWithBackoff(mockFn, 2, 10);
    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(3);
  }, 10000);

  test("should throw error after max retries", async () => {
    const mockFn = jest.fn().mockRejectedValue(new Error("Persistent failure"));

    await expect(retryWithBackoff(mockFn, 2, 10)).rejects.toThrow(
      "Persistent failure"
    );
    expect(mockFn).toHaveBeenCalledTimes(3);
  }, 10000);

  test("should not retry on success", async () => {
    const mockFn = jest.fn().mockResolvedValue("Success");

    const result = await retryWithBackoff(mockFn, 3, 100);

    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(1);
  }, 10000);

  test("should use exponential backoff", async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error("First failure"))
      .mockRejectedValueOnce(new Error("Second failure"))
      .mockResolvedValue("Success");

    const result = await retryWithBackoff(mockFn, 2, 10, 2);

    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(3);
  }, 10000);

  test("retryApiCall should work with default parameters", async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error("First failure"))
      .mockResolvedValue("Success");

    const result = await retryApiCall(mockFn);

    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(2);
  }, 10000);
});
