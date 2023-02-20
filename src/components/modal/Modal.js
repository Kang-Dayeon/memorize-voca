import React from 'react'

const Modal = (props) => {
  return (
    <div className={`modal ${props.display ? 'active' : ''}`}>
      <div className="modal__bg">
        <div className="modal__content-box">
          <h4 className="sub-title">{props.name}</h4>
          <div className="modal__content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal