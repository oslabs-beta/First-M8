import React from 'react'
import GithubCat from '../GithubCat.svg'
import FirstM8Logo from '../First_M8_Logo-C.png'

//main home page item. the first thing everyone sees
const Home = () => {
    //tba
    //render SVG of our logo on the home page TODO when finalized
  return (
    <div classname="logoimg">
      <img src={FirstM8Logo}  width="560px" />
    <div className="downloaddiv"> 
      <a href= "https://github.com/oslabs-beta/First-M8" target = "_blank">
        <img src={GithubCat} alt="github" width="45px" className="githubLogo" title="Check out our Github!" />
      </a>
    </div>
  </div>
  )
}

export default Home;

//button sends us to:
// https://github.com/oslabs-beta/First-M8