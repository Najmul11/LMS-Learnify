import { api } from "../apiSlice";

const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data: any) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = coursesApi;
