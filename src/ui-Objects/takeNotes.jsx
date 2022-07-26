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
    }else if(create){
        q="create";
        testID = create;
        url = "/create/"+create;
    }else{
        testID = false;
        q=false;
    }
    const viewNote = useSelector(state=>state.currNote.selectedNote);

    function update() {
        setTitle(hooktitle);
        setBody(hookbody);
        setDate(hooktime);
    }

    if (type) {
        let num=1;
        setTimeout(() => {
            num = 1000;
            update()
        }, num);
    }

    const hookid = viewNote.id;
    const hooktitle = viewNote.title;
    const hookbody = viewNote.body;
    const hooktime = viewNote.date;

    const fullDate = useGetDate();

    const [title, setTitle] = useState(`${hookid ? hooktitle : ""}`);
    const [date, setDate] = useState(`${q ==="type" && hookid ? hooktime : fullDate}`);
    const [body, setBody] = useState(`${hookid ? hookbody : ""}`);

    useEffect(()=>{
        setTitle(hooktitle)
        setBody(hookbody);
        setDate(hooktime)
        dispatch(selectedNote(testID))
    }, [dispatch, testID])


    const noteData = { date: fullDate, title, body };
    const currentNoteData = { title, body };
    const prevNoteData = {title: hooktitle, body: hookbody};


    useEffect(()=>{
        if (id) {
            const isChangedTitle = currentNoteData.title === prevNoteData.title;
            const isChangedBody = currentNoteData.body === prevNoteData.body;
    
            console.log({isChangedBody, isChangedTitle});

            if (isChangedBody && isChangedTitle) {
                setNoteSaved(true)
            }else{
                setNoteSaved(false)
            }
        }
    }, [title, body])



    const editNote = () => {
        // setAddData(noteData)
        // dispatch(addNoteThunk(noteData))
        dispatch(editItem(data, noteData, id ))
        setDidChange((Math.random()*100))
        navigate(`/`);
    }
    
    if(id){
        console.log({inner: noteSaved});
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
                    {q === "id" && <i className="far fa-check" onClick={editNote}></i>}
                    {q === "type" && <Link to={url}><i className="far fa-pen"></i></Link> }
                    <p>{date}</p>
                </div>
                <input type="text" placeholder='Title' disabled={`${q==="type"? "true" : ""}`} className="noteTitle" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea cols="30" onChange={e => setBody(e.target.value)} value={body} disabled={`${q==="type"? "true" : ""}`} rows="10" placeholder='Note something down' maxLength="15000" className="takeNotes"></textarea>
            </div>
        </section>
    )
}

export default TakeNotes