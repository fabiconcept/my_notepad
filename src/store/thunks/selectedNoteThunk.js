import { currentNoteAction } from "../slices/currentNoteSlice";

export const selectedNote = (id) => {
    return async(dispatch)=>{
        const getNote = async()=>{
            const req = await fetch(`http://localhost:8000/list/${id}`);
            const data = req.json()
            return data;
        }

        try {
            const response = await getNote();
            dispatch(currentNoteAction.setSelectedNote({note: response}))
        } catch (error) {
            console.log(error)
        }
    }
}