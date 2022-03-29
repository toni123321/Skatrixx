import React, { useState, useEffect } from 'react'
import { getProfileAchievements } from '../services'

import "../stylesheets/Achievements.css"

import AchievementContainer from './AchievementContainer'

function Achievements(props) {

    let achievements = getProfileAchievements()
    const [viewedAchievement, setViewedAchievement]  = useState();
    const [nextAcievement, setNextAchievement] = useState();
    const [prevAcievement, setPrevAchievement] = useState();
    const [viewedAchievementIndex, setViewedAchievementIndex] = useState(0);

    useEffect(() => {
        if(achievements.length === 1) {
            setViewedAchievement(achievements[0]);
            setPrevAchievement(undefined);
            setNextAchievement(undefined);
        }
        else if(achievements.length === 0) {
            setViewedAchievement(undefined);
            setPrevAchievement(undefined);
            setNextAchievement(undefined);
        }
        else {
            setViewedAchievement(achievements[0]);
            setPrevAchievement(achievements[achievements.length - 1]);
            setNextAchievement(achievements[1]);
        }
      }, []);

      const changeAchievement = (position) => {
        if(position === 'forward') {
            if((viewedAchievementIndex) === achievements.length - 1) {
                const newIndex = 0
                setViewedAchievementIndex(newIndex); 
                setViewedAchievement(achievements[newIndex]);
                setPrevNextAchievements(newIndex);
            }
            else {
                const newIndex = viewedAchievementIndex + 1;
                setViewedAchievementIndex(newIndex);
                setViewedAchievement(achievements[newIndex]);
                setPrevNextAchievements(newIndex);
            }
        }
        else if(position === 'backward') {
            if(viewedAchievementIndex === 0) {
                const newIndex = achievements.length - 1;
                setViewedAchievementIndex(newIndex); 
                setViewedAchievement(achievements[newIndex]);
                setPrevNextAchievements(newIndex);
            }
            else {
                const newIndex = viewedAchievementIndex - 1;
                setViewedAchievementIndex(newIndex);
                setViewedAchievement(achievements[newIndex]);
                setPrevNextAchievements(newIndex);
            }
        }
    }

    const setPrevNextAchievements = (index) => {
        if(index === 0) {
            setPrevAchievement(achievements[achievements.length - 1])
            setNextAchievement(achievements[1])
        }
        else if(index === achievements.length - 1) {
            setPrevAchievement(achievements[index - 1]);
            setNextAchievement(achievements[0])
        }
        else {
            setPrevAchievement(achievements[index - 1])
            setNextAchievement(achievements[index + 1])
        }
    }

  return (
    <div className='achievements'>
        <p>Achievements</p>
        <div id='rotator-wheel'>
            <button className='selector' id='prev' onClick={() => {changeAchievement('backward')}}><i className="fa-solid fa-circle-left"></i></button>
            <div id='previous-achievement'>
                <AchievementContainer img={prevAcievement}/>
            </div>
            <div id='current-achievement'>
                <AchievementContainer img={viewedAchievement}/>
            </div>
            <div id='next-achievement'>
                <AchievementContainer img={nextAcievement}/>
            </div>
            <button className='selector' id='next' onClick={() => {changeAchievement('forward')}}><i className="fa-solid fa-circle-right"></i></button>
        </div>
    </div>
  )
}

export default Achievements
