import { deleteNoteAction } from "../slices/deleteNoteItem";

export const deleteNote = (id) =>{
    return async(dispatch)=>{
        const removeItem = async(id) =>{
            const res = await fetch(`http://localhost:8000/list/${id}`, {
                method: "DELETE"
            });

            const data = res.json()
            return data
        }

        try {
            const response = await removeItem(id)
            dispatch(deleteNoteAction.isDeleted({status: true, error: null}))
        } catch (error) {
            dispatch(deleteNoteAction.isDeleted({status: false, error: "You fuxk up"}))
        }
    }
}