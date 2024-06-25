import { Modal, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const ModalWelcome = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
        <button className="btn btn-error text-white" onClick={handleConfirm}>
          Yes, Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWelcome;
