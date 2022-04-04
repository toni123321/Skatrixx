import React from 'react'
import '../stylesheets/Skate'

function SKATEMenu(props) {
  return (
    <div className='SKATEMenu'>
        <p id='back-right' onClick={() => {props.back('Menu')}}>&lt;</p>   
        <p>Create Lobby</p>
        <p>Join Lobby</p> 
    </div>
  )
}

export default SKATEMenu