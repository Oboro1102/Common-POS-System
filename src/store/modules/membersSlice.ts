import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface membersListType {
    login: {
        uuid: string
    },
    email: string,
    gender: string,
    name: {
        first: string,
        last: string
    },
    location: {
        state: string,
        country: string,
        city: string
    },
    phone: string,
    picture: {
        thumbnail: string
    },
    registered: { date: string },
}

const initialState = {
    membersList: [] as membersListType[]
}

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        resetMembersList() { return initialState },
        initialMembersList(state, action: PayloadAction<membersListType[]>) {
            state.membersList = action.payload
        },
    },
})

export const { resetMembersList, initialMembersList } = membersSlice.actions
export const membersList = (state: RootState) => state.members.membersList;

export default membersSlice.reducer