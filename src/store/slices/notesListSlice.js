import { createSlice } from "@reduxjs/toolkit";

export const notesListSlice = createSlice({
    name: "List of Slices",
    initialState: {
        note: [],
        isPending: true,
        error: null
    },
    reducers: {
        createList(state, action){
            state.note = action.payload.note;
        },
        setIsPending(state, action){
            state.isPending = action.payload.isPending;
        },
        addError(state, action){
            state.error = action.payload.error
        }
    }
});

export const noteListAction = notesListSlice.actions;