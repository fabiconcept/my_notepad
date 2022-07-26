import { createSlice } from "@reduxjs/toolkit";

export const deleteNoteSlice = createSlice({
    name: "Stored delete request respone",
    initialState:{
        status: false,
        error: null
    },
    reducers:{
        isDeleted(state, action){
            state.status = action.payload.status
            state.error = action.payload.error
        }
    }
})


export const deleteNoteAction = deleteNoteSlice.actions;