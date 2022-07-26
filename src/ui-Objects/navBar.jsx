import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navArea">
        <Link to="/" className='linked'><div className="logo">Notepro+</div></Link>
        <div className="links">
            <span>@Username</span>
        </div>
    </div>
  )
}

export default NavBar