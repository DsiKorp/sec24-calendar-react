import { configureStore } from '@reduxjs/toolkit';
//import { calendarSlice } from './calendar/calendarSlice';
import { uiSlice } from './ui/uiSlice';
import { authSlice, calendarSlice } from './';



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // Fix Serialization error: A non-serializable value was detected in the state,
        //  in the path: `payload.start`
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;
