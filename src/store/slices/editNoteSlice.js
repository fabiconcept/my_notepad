import { createSlice } from "@reduxjs/toolkit";

export const editNoteSlice = createSlice({
    name: "Edit Notepro+ data",
    initialState: {
        isEdited: false,
        error: null
    },
    reducers:{
        updateIsEdited (state, action){
            state.isEdited = action.payload.isEdited;
        },
        addError(state, action){
            state.error = action.payload.error;
        }
    }
})

export const editNoteAction = editNoteSlice.actions;