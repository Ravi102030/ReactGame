import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import "./gameOver.css"
import { Link } from "react-router-dom";



function ModalDialog(props) {
  const [isShow, invokeModal] = React.useState(props.gameOver)
  const initModal = () => {
    return invokeModal(!false)
  }
  return (
    <>
     
      <Modal className='modal-box' show={isShow}  >
        <Modal.Header>
          <Modal.Title>Game Over..!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='score-pop'>Your Score is: <span className='sco'>{props.score}</span></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=>props.setOn(true)}>
            Play Again
          </Button>
          <Button variant="danger" onClick={()=>props.setOn()}>
            Exit
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalDialog