import React from 'react'
import FirstM8Logo from '../First_M8_Logo-C.png'


//main about the team item. gives a description of team members
//and what they did(?)
const Team = () => {
  return (
      <div className="aboutdiv">
        <h2>
            <div className="teamContainer">
              <div class="teamContainerHeader">Meet the Team:</div>
              <div class="profileHolder">
                <div class="profileCards">
                  <p>Jung Ho (Alex) Lee</p>
                  <p3>Passionate Fisherman and Foodie.</p3>
                  <a href='https://www.linkedin.com/in/jungholee27/'>LinkedIn</a>
                  <a href='https://github.com/jungholee27'>GitHub</a>
                </div>
                <div class="profileCards">
                  <p>Derek Chen</p>
                  <p3>Coffee Enthusiast and Keyboard Builder.</p3>
                  <a href='https://www.linkedin.com/in/derek-junhao-chen/'>LinkedIn</a>
                  <a href='https://github.com/poofywater'>GitHub</a>
                </div>
                <div class="profileCards">
                  <p>Nisa Lintakoon</p>
                  <p3>BBQ Noob Master, Loyal Follower of Beyonce.</p3>
                  <a href='https://www.linkedin.com/in/nisalintakoon/'>LinkedIn</a>
                  <a href='https://github.com/nisalintakoon'>GitHub</a>
                </div>
                <div class="profileCards">
                  <p>Kevin MacCoy</p>
                  <p3>Cake Connoisseur and Gamer.</p3>
                  <a href='https://www.linkedin.com/in/kevin-maccoy/'>LinkedIn</a>
                  <a href='https://github.com/kmaccoy'>GitHub</a>
                </div>
              </div>
            </div>
          </h2>
      </div>
  )
}

export default Team;

