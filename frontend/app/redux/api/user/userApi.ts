import { api } from "../apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: "/users/update-avatar",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/users/update-userinfo",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/users/update-user-password",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
} = userApi;
