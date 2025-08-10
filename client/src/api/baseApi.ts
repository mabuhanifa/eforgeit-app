import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/auth/authSlice";
import { axiosBaseQuery } from "./axiosBaseQuery";

const baseQuery = axiosBaseQuery({
  baseUrl: "https://test-school-1trd.onrender.com/api",
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result.error as any)?.data?.message === "Not authorized, user not found"
  ) {
    api.dispatch(logout());
    return result;
  }

  if (result.error && (result.error as any).status === 401) {
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
