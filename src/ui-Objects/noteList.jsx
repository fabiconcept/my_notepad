import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NoteList = ({ date, title, idm, body, toDel, setToDel, isMobile }) => {
    const [isSelected, setIsSelected] = useState(false);
    const navigate = useNavigate();

    const { ids, type } = useParams();

    const handleClick = ()=>{
        if(idm ===parseInt(ids) || idm ===parseInt(type)){
            navigate("/")
        }
    }

    let q = '';

    if (ids) {
        q = "id"
    } else if (type) {
        q = "type";
    } else {
        q = ""
    }

    const prepForDel = () => {
        if ((toDel.length <= 2 || isSelected)) {
            if(q===""){
                if (!isSelected) {
                    if (toDel.length <= 2) {
                        setToDel([
                            ...toDel, { id: idm }
                        ])
                    }
                } else {
                    setToDel(toDel.filter(item => item.id !== idm))
                }
                setIsSelected(!isSelected)
            }
        }
    }

    return (
        <div onDoubleClick={prepForDel} className={`${isSelected ? "selected" : "li"}`} onClick={handleClick}>
            <div className="line"></div>
            <li>
                <p className="title"><Link to={`/view/${idm}`}>{title}</Link></p>
                <p className="noteText">{body}</p>
                <p className="time">{date}</p>
            </li>
            {isMobile && <input type="checkbox" onChange={prepForDel}/>}
        </div>
    )
}

export default NoteList;