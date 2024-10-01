import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function ModalComponent({ show, handleClose, handleConfirm,title,description }) {
//   const [show, setShow] = useState(true);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form> */}
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className='bg-red-500'>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm} className='bg-[#f2faf8ff] text-gray-800'>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;