import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface serveListType {
    id: string,
    image: string,
    name: string,
    spec: string,
    price: number,
    group: string
}

const initialState = {
    serveList: [{
        id: '2023-08-22T05:57:32.940Z',
        image: 'https://picsum.photos/id/139/360.webp',
        name: '紅茶',
        spec: 'L',
        price: 25,
        group: '飲品'
    },
    {
        id: '2023-08-22T08:41:25.424Z',
        image: 'https://picsum.photos/id/1080/360.webp',
        name: '綠茶',
        spec: 'L',
        price: 30,
        group: '飲品'
    },
    {
        id: '2023-08-22T08:41:43.163Z',
        image: 'https://picsum.photos/id/292/360.webp',
        name: '烏龍茶',
        spec: 'L',
        price: 45,
        group: '飲品'
    },
    {
        id: '2023-08-22T08:41:52.736Z',
        image: 'https://picsum.photos/id/425/360.webp',
        name: '青茶',
        spec: 'L',
        price: 35,
        group: '飲品'
    },
    {
        id: '2023-08-22T09:24:21.065Z',
        image: 'https://picsum.photos/id/126/360.webp',
        name: '紅豆牛奶冰',
        spec: 'L',
        price: 70,
        group: '冰品'
    },
    {
        id: '2023-08-22T09:25:05.096Z',
        image: 'https://picsum.photos/id/223/360.webp',
        name: '愛玉冰',
        spec: 'L',
        price: 50,
        group: '冰品'
    }] as serveListType[]
}

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        reset() { return initialState },
        initialServeList(state, action: PayloadAction<serveListType[]>) {
            state.serveList = action.payload
        },
        addServe(state, action: PayloadAction<serveListType>) {
            state.serveList.push(action.payload)
        },
        removeServe(state, action: PayloadAction<string>) {
            const id = action.payload
            const targetIndex = state.serveList.findIndex(item => item.id === id)
            if (targetIndex !== -1) {
                state.serveList.splice(targetIndex, 1)
            }
        },
        editServe(state, action: PayloadAction<serveListType>) {
            const { id } = action.payload
            const targetIndex = state.serveList.findIndex(item => item.id === id)
            Object.assign(state.serveList[targetIndex], action.payload)
        },
    },
})

export const { reset, initialServeList, addServe, editServe, removeServe } = systemSlice.actions
export const serveList = (state: RootState) => state.system.serveList;

export default systemSlice.reducer