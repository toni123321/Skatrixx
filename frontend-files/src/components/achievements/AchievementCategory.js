import React from 'react'

import icon1 from '../../images/badges/Trick Master.png' 
import icon2 from '../../images/badges/Community.png'
import icon3 from '../../images/badges/Competitive.png'
import icon4 from '../../images/badges/Consistency.png'

import '../../stylesheets/achievements/AchievementCategory.css'

function AchievementCategory(props) {

    var achievements = [ 
        {
            icon : icon1,
            name : "Achievement",
            locked : false, 
            xp : 100
        },
        {
            icon : icon2,
            name : "Achievement",
            locked : false, 
            xp : 100
        },
        {
            icon : icon3,
            name : "Achievement",
            locked : true, 
            xp : 100
        },
        {
            icon : icon4,
            name : "Achievement",
            locked : true, 
            xp : 100
        }
        ]

  return (
    <div className='achievement-category'>
        <p
        className="back-button"
        onClick={props.back}>
        <i className="fa-solid fa-angle-left"></i>
      </p>
      <h4>{props.category}</h4>
      <div className='achievement-category-items container-border'>
        <div className='default-container'></div>
        {achievements.map((achievement, index) => (
            <div className='achievement-container-box' key={index}>
                <img style={{opacity : achievement.locked ? .3 : 1}} src={achievement.icon} alt=''/>
                <p>{achievement.name}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementCategory