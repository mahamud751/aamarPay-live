import { AxiosError } from "axios";
import Swal from "sweetalert2";

export async function handleAxiosError(
  err: unknown,
  fallback = "Something went wrong",
  title = "Error"
) {
  let message = fallback;
  let status: number | undefined;

  if (err && typeof err === "object" && "response" in err) {
    const axiosError = err as AxiosError<{ message?: string }>;
    status = axiosError.response?.status;
    if (axiosError.response?.data?.message) {
      message = axiosError.response.data.message;
    }
  }

  if (status === 401) {
    return Swal.fire({
      icon: "error",
      title: "Authentication Error",
      text: "Your session has expired. Please log in again.",
    });
  }

  return Swal.fire({
    icon: "error",
    title,
    text: message,
  });
}
