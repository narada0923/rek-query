import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../model/contact.model";

export const contactsApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/contact" }),
    tagTypes: ["Contacts"],
    endpoints: builder => ({
        contacts: builder.query<Array<Contact>, void>({
            query: () => "/contacts",
            providesTags: ["Contacts"],
        }),
        addContact: builder.mutation<{ message: string }, Contact>({
            query: contact => ({
                url: "/add_contact",
                method: "POST",
                body: contact,
            }),
            invalidatesTags: ["Contacts"],
        }),
        deleteContact: builder.mutation<{ message: string }, string>({
            query: id => ({
                url: `/delete_contact?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Contacts"],
        }),
        updateContact: builder.mutation<{ message: string }, { id: string; contact: Contact }>({
            query: ({ contact, id }) => ({
                url: `/update_contact?id=${id}`,
                method: "put",
                body: contact,
            }),
            invalidatesTags: ["Contacts"],
        })
    })
});

export const { useContactsQuery, useAddContactMutation, useDeleteContactMutation, useUpdateContactMutation } = contactsApi;
