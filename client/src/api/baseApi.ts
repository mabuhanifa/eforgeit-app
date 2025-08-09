import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/auth/authSlice";
import { axiosBaseQuery } from "./axiosBaseQuery";

const baseQuery = axiosBaseQuery({
  baseUrl: "http://localhost:5000/api",
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle the specific case where the user ID in the token is no longer valid
  if (
    (result.error as any)?.data?.message === "Not authorized, user not found"
  ) {
    api.dispatch(logout());
    return result;
  }

  if (result.error && (result.error as any).status === 401) {
    // Cast getState() to any to break circular dependency
    const refreshToken = (api.getState() as any).auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "POST", data: { token: refreshToken } },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const { accessToken } = refreshResult.data as { accessToken: string };
        const newCredentials = {
          accessToken,
          refreshToken,
          user: (api.getState() as any).auth.user,
        };
        api.dispatch(setCredentials(newCredentials));
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, logout
        api.dispatch(logout());
      }
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Question", "Assessment"],
  endpoints: () => ({}),
});
