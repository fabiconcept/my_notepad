import React, { useEffect, useState } from 'react'
import NoteList from '../ui-Objects/noteList'
import TakeNotes from '../ui-Objects/takeNotes'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { notesListThunk } from '../store/thunks/notesListThunk';
import { deleteNote } from '../store/thunks/deleteNote';

const NotesPage = () => {
  const dispatch = useDispatch()
  const note = useSelector(state => state.noteList.note)
  const isPending = useSelector(state => state.noteList.isPending)
  const error = useSelector(state => state.noteList.error)
  let isMobile = false;
  const [findText, setFindText]= useState("");
  const [didChange, setDidChange] = useState(0)
  const [toDel, setToDel] = useState([]);
  const [foundList, setFoundList]= useState([]);

  const sortedNote = Object.values(note);
  const useableSortedList = sortedNote.reverse();

  useEffect(()=>{
    dispatch(notesListThunk())
  },[dispatch, didChange])

  const {ids, type, create} = useParams();
  let q = '';

  if (ids) {
    q = "id"
  } else if (type) {
    q = "type";
  } else if (window.location.pathname === "/create/" || window.location.pathname === "/create") {
    q = "create";
  } else {
    q = ""
  }

  // Delete selected note
  const delNotes = () => {
    let len = toDel.length
    if (window.confirm(`Are you sure your want to delete ${len} items?`)) {
      toDel.forEach(element => {
        let id = element.id;
        dispatch(deleteNote(id))
        setTimeout(() => {
          setDidChange((Math.random() * 12))
          
          setToDel(toDel.filter(item => item !== element));
        }, 100);
      });
      setTimeout(()=>{
        setToDel([]);
      }, 1000)
    }
  }

  let mb = false
  if(window.innerWidth <= 650){
    mb = true;
    if (q !== "") {
      isMobile = true;
    }
  }

  // Perform search 
  const searching = e =>{
    setFindText(e.target.value);
    const searchResult = []
    useableSortedList.forEach(element => {
      const compValue = (element.title).toLowerCase()
      if (compValue.includes(findText.toLowerCase())) {
        searchResult.push(element)
      }
    });
    setFoundList(searchResult);
  }

  
  return (
    <div className="notes mb">
      <section className="list" style={{display: `${isMobile ? "none" : ""}`}}>
        <div className={`${q === "" ? "addCage" : "hide"}`}>
          {toDel.length === 0 && <Link to="/create/" className='fal fa-plus addNew'></Link>}
          {toDel.length > 0 && <i className='far fa-trash delNew' onClick={delNotes}><span>{toDel.length}</span></i>}
        </div>
        <input type="search" value={findText} onChange={searching} placeholder='Search in note...' className="finder" />
        {!isPending && findText && foundList.map(item => (
          <NoteList 
            key={item.id}
            idm={item.id}
            toDel= {toDel}
            setToDel= {setToDel}
            title={item.title}
            body={item.body}
            isMobile ={mb}
            date={item.date}
          />
        ))}
        {!isPending && !findText && useableSortedList.map(item => (
          <NoteList 
            key={item.id}
            idm={item.id}
            toDel= {toDel}
            setToDel= {setToDel}
            title={item.title}
            body={item.body}
            isMobile ={mb}
            date={item.date}
          />
        ))}
        {isPending && <p className="text-center endText f-s">Loading notes please wait...</p>}
        {useableSortedList.length > 0 && !findText && <p className="text-center endText f-s">You've reached the end</p>}
        {useableSortedList.length > 0 && findText && foundList.length === 0 &&  <p className="text-center endText f-s">No results found!</p>}
        {useableSortedList.length === 0 && <p className="text-center endText f-s">Your notes list is pretty empty, why?</p>}
      </section>
      {!isPending && <TakeNotes
        id={ids}
        type={type}
        create={create}
        data={note}
        setDidChange={setDidChange}
      />}
    </div>
  )
}

export default NotesPage;