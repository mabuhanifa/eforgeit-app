import { logout, setCredentials } from "../features/auth/authSlice";
import { baseApi } from "./baseApi";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken } = data;
          const profileResponse = await dispatch(
            authApiSlice.endpoints.getProfile.initiate(undefined)
          ).unwrap();
          dispatch(
            setCredentials({
              user: profileResponse,
              accessToken,
              refreshToken,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        data: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(baseApi.util.resetApiState());
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getProfile: builder.query({
      query: () => "/auth/profile",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApiSlice;
