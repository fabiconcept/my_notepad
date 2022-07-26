import { addNoteAction } from "../slices/addNote";

export const addNoteThunk = (text)=>{
    return async(dispatch)=>{
        const sendReq = async()=>{
            const res = await fetch("http://localhost:8000/list", {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(text),
                method: "POST"
            });

            const data = res.json();

            return data;
        }

        try {
            const response = sendReq();
            dispatch(addNoteAction.updateIsAdded({isAdded: true}))
        } catch (error) {
            dispatch(addNoteAction.updateIsAdded({isAdded: false}))
            dispatch(addNoteAction.addError({error: error}))
        }
    }
}