import { api } from "../apiSlice";
import { userRegistration } from "./authSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/users/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(userRegistration({ token: result.data.data.token }));
        } catch (error) {}
      },
    }),
    activation: builder.mutation({
      query: (data) => ({
        url: "/users/activate-user",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
