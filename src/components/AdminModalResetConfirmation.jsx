// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const AdminModalResetConfirmation = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to reset this form?</Modal.Body>
      <Modal.Footer>
        <Button variant="btn btn-primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="btn btn-error text-white" onClick={handleConfirm}>
          Yes, Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminModalResetConfirmation;
