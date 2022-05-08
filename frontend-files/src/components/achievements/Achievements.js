import React, { useState, useEffect } from 'react'
import { getProfileAchievements } from '../../services/userService'
import "../../stylesheets/achievements/Achievements.css"
import KickflipMaster from "../../images/badges/kickFlipMaster.png"
import noComplyMaster from "../../images/badges/noComplyMaster.png"

function Achievements(props) {


  return (
    <div className='achievements'>
        <h4 className='pageTitleAchievements'>Achievements</h4>

        <p align="left" className="TrickTitle">Trick Master</p>
        <div className="progressBar">
        <span></span>
        </div>
        <div className='LoyaltyBadges'>
        <div className='BadgesSwipe'>   
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={noComplyMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={noComplyMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={noComplyMaster} alt=''/></div>
        </div>         
        </div>

        <p align="left" className="TrickTitle">Loyalty</p>
        <div className="progressBar">
        <span></span>
        </div>
        <div className='LoyaltyBadges'>
        <div className='BadgesSwipe'>   
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={noComplyMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={noComplyMaster} alt=''/></div>
        </div>         
        </div>

        <p align="left" className="TrickTitle">Competitive</p>
        <div className="progressBar">
        <span></span>
        </div>
        <div className='LoyaltyBadges'>
        <div className='BadgesSwipe'>   
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        <div className='badge'><img className="badgeSize"src={KickflipMaster} alt=''/></div>
        </div>         
        </div>

    </div>
  )
}

export default Achievements
