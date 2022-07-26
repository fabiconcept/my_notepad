import { editNoteAction } from "../slices/editNoteSlice";

export const editItem = (arr, noteData, id) =>{
    return (dispatch)=>{
        const sendEdit = async()=>{
            const res = await fetch(`http://localhost:8000/list/${id}`, {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(noteData),
                method: "PUT"
            });

            const data = res.json()

            return data
        }

        try {
            const response = sendEdit();
            dispatch(editNoteAction.updateIsEdited({isEdited: true}))
        } catch (error) {
            dispatch(editNoteAction.updateIsEdited({isEdited: false}))
            dispatch(editNoteAction.addError({error: error}))
            
        }
    }
}