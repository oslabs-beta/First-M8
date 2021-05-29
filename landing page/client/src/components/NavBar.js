import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    //add more links as needed
  return (
      <div>
        <nav>
          <NavLink className="navLink" to="/"> HOME </NavLink>
          <NavLink className="navLink" to="/medium"> MEDIUM </NavLink>
          <NavLink className="navLink" to="/team"> TEAM </NavLink>
          <NavLink className="navLink" to="/download"> DOWNLOAD </NavLink>

        </nav>
      </div>
  )
}
export default NavBar