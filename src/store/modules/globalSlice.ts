import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface orderItemsType {
    id: string,
    image: string,
    name: string,
    spec: string,
    price: number,
    group: string,
    qty: number
}

const initialState = {
    currentTab: 0,
    orderItems: [] as orderItemsType[]
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        reset() { return initialState },
        setCurrentTab(state, action: PayloadAction<number>) {
            state.currentTab = action.payload
        },
        addNewOrderItem(state, action: PayloadAction<orderItemsType>) {
            const target = Object.assign({}, action.payload)
            target.qty = 1
            state.orderItems.push(target)
        },
        tuneOrdersItemQty(state, action: PayloadAction<{ id: string, qty: number, trigger?: boolean }>) {
            const { id, qty, trigger } = action.payload
            const target = state.orderItems.find(item => item.id === id)
            if (target) {
                if (trigger) {
                    const exactQty: number = target.qty += qty
                    Object.assign(target, { qty: exactQty > 1 ? exactQty : 1 })
                } else {
                    Object.assign(target, { qty: qty })
                }
            }
        },
        removeOrdersItem(state, action: PayloadAction<string>) {
            const id = action.payload
            const targetIndex = state.orderItems.findIndex(item => item.id === id)

            if (targetIndex !== -1) {
                state.orderItems.splice(targetIndex, 1)
            }
        },
    },
})

export const { reset, setCurrentTab, addNewOrderItem, tuneOrdersItemQty, removeOrdersItem } = globalSlice.actions
export const currentTab = (state: RootState) => state.global.currentTab;
export const orderItems = (state: RootState) => state.global.orderItems;

export default globalSlice.reducer