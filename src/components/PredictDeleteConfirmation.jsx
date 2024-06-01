import { Modal, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const PredictDeleteConfirmation = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this prediction?</Modal.Body>
      <Modal.Footer>
        <Button className="btn" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="btn btn-error text-white" onClick={handleConfirm}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PredictDeleteConfirmation;
