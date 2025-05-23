import { configureStore } from "@reduxjs/toolkit"
import slices from "./slices/slice"
export const store = configureStore({
    reducer: {
        slices
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;