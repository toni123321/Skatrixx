import React from 'react'
import "../../stylesheets/gallery/Modal.css"
function Modal(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  )
}

export default Modal