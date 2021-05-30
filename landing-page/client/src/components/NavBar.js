import React from 'react'
import {NavLink} from 'react-router-dom'
import { render } from 'github-buttons'
import GitHubButton from 'react-github-btn'

//main nav bar item, provides the navlinks to the rest of the app
const NavBar = () => {
    //add more links as needed
  return (
      <div>
        <nav>
          <NavLink className="navLink" to="/"> HOME </NavLink>
          <NavLink className="navLink" to="/medium"> MEDIUM </NavLink>
          <NavLink className="navLink" to="/team"> TEAM </NavLink>
          <div className = "gitStar">
          <GitHubButton href="https://github.com/oslabs-beta/First-M8" className="navStar" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star oslabs-beta/First-M8 on GitHub">Star</GitHubButton>
          </div>
        </nav>
      </div>
  )
}
export default NavBar;