import {createSlice} from "@reduxjs/toolkit";

export const currentNoteSlice  =  createSlice({
    name: "Active note",
    initialState: {
        selectedNote: []
    },
    reducers:{
        setSelectedNote(state, action){
            state.selectedNote = action.payload.note;
        }
    }
})

export const currentNoteAction = currentNoteSlice.actions;