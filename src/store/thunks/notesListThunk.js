import { noteListAction } from "../slices/notesListSlice";

export const notesListThunk = () =>{
    return async(dispatch)=>{
        const fetchNotes = async() =>{
            const req = await fetch("http://localhost:8000/list");
            const data = req.json();
            return data;
        }

        try {
            const response = await fetchNotes();
            dispatch(noteListAction.createList({note: response}))
            dispatch(noteListAction.setIsPending({isPending: false}))
        } catch (error) {
            dispatch(noteListAction.setIsPending({isPending: false}))
            dispatch(noteListAction.addError({error: error}))
        }
    }
}