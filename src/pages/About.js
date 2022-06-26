import React, { Component } from 'react';

import "./About.css";
import sanjaygorur from "../../src/assets/sanjaygorur.jpg";
  
export default class About extends Component {
  render() {
    return (
      <div>
          <p>      
            <div>
              <div class="split left">
                <div className="centered">
                  <img 
                    className="profile_image"
                    src={sanjaygorur}
                    alt="Profile Pic"
                    ></img>
                </div>
              </div>
              <div className="split right">
                <div className="centered">
                  <div className="name_title">Sanjay Gorur</div>
                  <div className="brief_description">
                    Hi, my name is Sanjay, and I'm an undergraduate at UT Austin. My hobbies include basketball, chess, and football. <n> </n> My dream career
                    is software engineering, and I think this program gives me a great opportunity to pursue my passion(s).
                  </div>
                </div>
              </div>
        </div> 
        </p> 
      </div>
    )
  }
} 