import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetDate } from '../myHook/useGetDate';
import { addNoteThunk } from '../store/thunks/addNoteThunk';
import { editItem } from '../store/thunks/editItemThunk';
import { selectedNote } from '../store/thunks/selectedNoteThunk';

const TakeNotes = ({ data, id, type, create, setDidChange }) => {
    const navigate = useNavigate();
    const [noteSaved, setNoteSaved] = useState(true)
    let q,url, testID;
    const dispatch = useDispatch();

    if (id){
        q="id";
        testID=id;
    }else if(type){
        q="type";
        testID = type;
        url = "/edit/"+type;
    }else if(window.location.pathname === "/create/" || window.location.pathname === "/create"){
        q="create";
        testID = create;
        url = "/create/"+create;
    }else{
        testID = false;
        q=false;
    }
    const viewNote = useSelector(state=>state.currNote.selectedNote);

    // Update the notes page
    function update() {
        setTitle(hooktitle);
        setBody(hookbody);
        setDate(hooktime);
    }

    if (type) {
        let num=0;
        setTimeout(() => {
            num = 5000;
            update()
        }, num);
    }

    const hookid = viewNote.id;
    const hooktitle = viewNote.title;
    const hookbody = viewNote.body;
    const hooktime = viewNote.date;

    const fullDate = useGetDate();

    const [title, setTitle] = useState(`${hookid ? hooktitle : ""}`);
    const [date, setDate] = useState(`${q ==="type" && hookid ? hooktime : fullDate} ${q === "create" && fullDate}`);
    const [body, setBody] = useState(`${hookid ? hookbody : ""}`);

    // Initial dispatch to set notespage
    useEffect(()=>{
        setTitle(hooktitle)
        setBody(hookbody);
        setDate(hooktime)
        dispatch(selectedNote(testID))
    }, [dispatch, testID])


    const noteData = { date: fullDate, title, body };
    const currentNoteData = { title, body };
    const prevNoteData = {title: hooktitle, body: hookbody};


    // Check for changes on the note before update
    useEffect(()=>{
        if (id) {
            const isChangedTitle = currentNoteData.title === prevNoteData.title;
            const isChangedBody = currentNoteData.body === prevNoteData.body;
    
            if (isChangedBody && isChangedTitle) {
                setNoteSaved(true)
            }else{
                setNoteSaved(false)
            }
        }
    }, [title, body])

    // Send updated note content to the json server
    const editNote = () => {
        dispatch(editItem(data, noteData, id ))
        setDidChange((Math.random()*100))
        navigate(`/`);
    }

    // Create new note on the json server
    const addNote = () => {
        dispatch(addNoteThunk(noteData))
        setDidChange((Math.random()*100))
        navigate(`/`);
    }
    
    if(q === 'id' || q === 'create'){
        window.addEventListener("beforeunload", e => {
            var confirmationText = "You've not saved this not oh!";
            (e || window.event).returnValue = confirmationText;
    
            return confirmationText;
        })
    }

    return (
        <section className="view">
            <div className="noText" style={{display: `${q ? "none": ""}`}}>
                Select or Create new Note
            </div>
            <div className="yesText"  style={{display: `${q ? "": "none"}`}}>
                <div className="date">
                    {q === "id" && <i className="" onClick={editNote}>save</i>}
                    {q === "create" && <i className="" onClick={addNote}>create</i>}
                    {q === "type" && <Link to={url}><i className="">edit</i></Link> }
                    <p>{date}</p>
                </div>
                <input type="text" placeholder='Title' disabled={`${q==="type"? "true" : ""}`} className="noteTitle" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea cols="30" onChange={e => setBody(e.target.value)} value={body} disabled={`${q==="type"? "true" : ""}`} rows="10" placeholder='Note something down' maxLength="15000" className="takeNotes"></textarea>
            </div>
        </section>
    )
}

export default TakeNotes