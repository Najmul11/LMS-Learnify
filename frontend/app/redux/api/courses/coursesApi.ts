import { api } from "../apiSlice";

const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/users/registration",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {} = coursesApi;
