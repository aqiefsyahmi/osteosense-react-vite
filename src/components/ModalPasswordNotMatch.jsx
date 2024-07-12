/* eslint-disable react/prop-types */
// ModalSuccessMessage.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal } from "react-bootstrap";

const ModalPasswordNotMatch = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>Confirm Password do not match!</Modal.Body>
    </Modal>
  );
};

export default ModalPasswordNotMatch;
