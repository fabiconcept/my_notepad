import { configureStore } from "@reduxjs/toolkit";
import { addNoteSlice } from "./slices/addNote";
import { currentNoteSlice } from "./slices/currentNoteSlice";
import { deleteNoteSlice } from "./slices/deleteNoteItem";
import { editNoteSlice } from "./slices/editNoteSlice";
import { notesListSlice } from "./slices/notesListSlice";

const store = configureStore({
    reducer:{addNote: addNoteSlice.reducer, edit: editNoteSlice.reducer, noteList: notesListSlice.reducer, currNote: currentNoteSlice.reducer, delete: deleteNoteSlice.reducer}
});

export default store;