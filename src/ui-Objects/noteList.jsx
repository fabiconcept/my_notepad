import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NoteList = ({ date, title, idm, body, toDel, setToDel }) => {
    const [isSelected, setIsSelected] = useState(false);

    const { ids, type, create } = useParams();
    let q = '';

    if (ids) {
        q = "id"
    } else if (type) {
        q = "type";
    } else {
        q = ""
    }

    const prepForDel = () => {
        if(q===""){
            if (!isSelected) {
                setToDel([
                    ...toDel, { id: idm }
                ])
            } else {
                setToDel(toDel.filter(item => item.id !== idm))
            }
            setIsSelected(!isSelected)
        }
    }

    return (
        <div className={`${isSelected ? "selected" : "li"}`}>
            <div className="line"></div>
            <li onDoubleClick={prepForDel}>
                <p className="title"><Link to={`/view/${idm}`}>{title}</Link></p>
                <p className="noteText">{body}</p>
                <p className="time">{date}</p>
            </li>
        </div>
    )
}

export default NoteList