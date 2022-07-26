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
  // const error = useSelector(state => state.noteList.error)
  const [didChange, setDidChange] = useState(0)
  const [toDel, setToDel] = useState([]);

  useEffect(()=>{
    dispatch(notesListThunk())
  },[dispatch, didChange])

  const {ids, type, create} = useParams();
  let q = '';

  if(ids){
    q = "id"
  }else if ( type){
    q ="type";
  }else{
    q=""
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
  
  return (
    <div className="notes">
      <section className="list">
        <div className={`${q === "" ? "addCage" : "hide"}`}>
          {toDel.length === 0 && <Link to="/create/" className='fal fa-plus addNew'></Link>}
          {toDel.length > 0 && <i className='far fa-trash delNew' onClick={delNotes}><span>{toDel.length}</span></i>}
        </div>
        <input type="search" placeholder='Search in note...' className="finder" />
        {!isPending && note.map(item => (
          <NoteList 
            key={item.id}
            idm={item.id}
            toDel= {toDel}
            setToDel= {setToDel}
            title={item.title}
            body={item.body}
            date={item.date}
          />
        ))}
        <p className="text-center endText f-s">You've reached the end</p>
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