import React from 'react'

function SKATEMenu(props) {
  return (
    <div className='SKATEMenu'>
        <p id='back' onClick={() => {props.back('Menu')}}>&lt;</p>   
        <p>Create Lobby</p>
        <p>Join Lobby</p> 
    </div>
  )
}

export default SKATEMenu