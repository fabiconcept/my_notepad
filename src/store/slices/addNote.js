import { createSlice } from "@reduxjs/toolkit";

export const addNoteSlice = createSlice({
    name: "Add note to JSON file",
    initialState: {
        isAdded: false,
        error: null
    },
    reducers:{
        updateIsAdded(state, action){
            state.isAdded = action.payload.isAdded;
        },
        addError(state, action){
            state.error = action.payload.error;
        }
    }
})

export const addNoteAction = addNoteSlice.actions;