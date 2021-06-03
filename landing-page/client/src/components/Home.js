import React from 'react'
import GithubCat from '../GithubCat.svg'

//main home page item. the first thing everyone sees
const Home = () => {
    //tba
    //render SVG of our logo on the home page TODO when finalized
  return (
     <div className="downloaddiv" > 
      <a href= "https://github.com/oslabs-beta/First-M8" target = "_blank">
        <img src={GithubCat} alt="github" className="githubLogo" title="Check out our Github!" />
      </a>
    </div>
  )
}

export default Home;

//button sends us to:
// https://github.com/oslabs-beta/First-M8