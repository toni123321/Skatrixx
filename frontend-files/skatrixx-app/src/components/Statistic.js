import {React, useEffect, useState} from 'react'
import "../stylesheets/Statistic.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import user from "../services/user"

function Statistic(props) {
  const [ovrStat, setOvrStat] = useState(50)
  const [trickId, setTrickId] = useState(null)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [msg, setMsg] = useState("")

  const [attemptTrickData, setAttemptTrickData] = useState({
    trickId: trickId,
    trickStat: 0
  })


  useEffect(() => {
    setOvrStat(80) // set skate stat
    setLoggedUserId(localStorage.getItem('userId')) // set logged user id
    setTrickId(props.trick._id) // set trick id
  }, [])

  useEffect(() => {
    // set trick attempt data
    setAttemptTrickData({
      trickId: trickId,
      trickStat: ovrStat
    })
  }, [trickId])

  const levelUp = async () => { 
    try{
      const res = await user.levelUp(loggedUserId, attemptTrickData)
      console.log(res)
      setMsg(`Congrats, your xp now is: ${res.data.xp}`)
    }
    catch(err) {
      setMsg("Opps, there was a mistake. Try again!")
    }
  }

  return (
    <div className='statistics'>
        <div id='progress-bars'>         
          <h3 className="title">Statistic</h3>
          <div>
            <CircularProgressbar className='bar' value={ovrStat} text={ovrStat} />;
          </div>
        </div>
        <div id="stat-btns">
        <button id="undo">Undo</button>
        <button onClick={levelUp} id="save">Save</button>
        </div>

        <h2>{msg !== "" ? msg: "Save your trick"}</h2>
    </div>
  )
}
export default Statistic