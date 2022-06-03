import React from 'react'
import "../../stylesheets/gallery/Modal.css"
function Modal(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <div className="close-icon" onClick={props.handleClose}><i class="fa-solid fa-xmark"></i></div>
        {props.content}
      </div>
    </div>
  )
}

export default Modal