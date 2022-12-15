import React from 'react'
import { Modal } from 'react-bootstrap'


function ModalContainer({open, handleClose, children, title}) {

  return (
    <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title ? title : "Modal Title"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalContainer
