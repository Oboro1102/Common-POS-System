import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import globalReducer from './modules/globalSlice'
import ordersReducer from './modules/ordersSlice'
import membersReducer from './modules/membersSlice'
import systemReducer from './modules/systemSlice'

export const store = configureStore({
    reducer: {
        global: globalReducer,
        orders: ordersReducer,
        members: membersReducer,
        system: systemReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;