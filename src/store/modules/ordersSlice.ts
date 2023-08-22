import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface orderHistoryType {
    id: string,
    serial: string,
    time: string,
    amount: number,
    orders: {
        id: string,
        image: string,
        name: string,
        spec: string,
        price: number,
        group: string,
        qty: number
    }[]
}

const initialState = {
    orderHistory: [] as orderHistoryType[]
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        reset() { return initialState },
        initialOrderHistory(state, action: PayloadAction<orderHistoryType[]>) {
            state.orderHistory = action.payload
        },
        addOrder(state, action: PayloadAction<orderHistoryType>) {
            state.orderHistory.push(action.payload)
        },
    },
})

export const { reset, initialOrderHistory, addOrder } = ordersSlice.actions
export const orderHistory = (state: RootState) => state.orders.orderHistory;

export default ordersSlice.reducer