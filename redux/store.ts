import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector as useSelectorBase } from "react-redux";
import { contactsApi } from "./service/contactsApi";

export const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(contactsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected => useSelectorBase<RootState, TSelected>(selector);
export const useAppDispatch = () => useDispatch<AppDispatch>();
