import React from 'react'

//main home page item. the first thing everyone sees
const Home = () => {
    //tba
    //render SVG of our logo on the home page TODO when finalized
  const handleClick = () => {
    //link to redirect to github logic
    
  }

  return (
      <div className="downloaddiv" onClick={handleClick}> 
            <a href= "https://github.com/oslabs-beta/First-M8" target = "_blank">
                <button>
                    <img src="../GitHub-Mark-64px.png" alt="github" className="githubbutton" title="download" />
                </button>
            </a>
      </div>
  )
}

export default Home;

//button sends us to:
// https://github.com/oslabs-beta/First-M8