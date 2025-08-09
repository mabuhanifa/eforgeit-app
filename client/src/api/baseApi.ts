import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { logout, setCredentials } from "../features/auth/authSlice";
import { axiosBaseQuery } from "./axiosBaseQuery";

const baseQuery = axiosBaseQuery({
  baseUrl: "http://localhost:5000/api",
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
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
          user: (api.getState() as RootState).auth.user,
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
