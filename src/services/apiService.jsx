import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page = 0, limit = 5) => `/posts?_page=${page}&_${limit}`,
    }),
    getPostById: builder.query({
      query: (id = 1) => `/posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
// export const { fetchPosts } = postsApi.endpoints.getPosts;
