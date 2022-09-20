import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com",
    }),
    tagTypes: ["Todos"],
    endpoints: builder => ({
        getTodos: builder.query<any, void>({
            query: () => "/todos",
            providesTags: ["Todos"]
        }),
        addPost: builder.mutation<
            {
                id: number;
                title: string;
                body: string;
                userId: number;
            },
            {
                title: string;
                body: string;
                userId: number;
            }
        >({
            query: post => ({
                url: "/posts",
                method: "POST",
                body: post
            }),
            invalidatesTags: ["Todos"]
        }),
    }),
});

export const { useGetTodosQuery, useAddPostMutation } = apiSlice;
