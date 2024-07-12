/* eslint-disable react/prop-types */
// ModalSuccessMessage.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal } from "react-bootstrap";

const ModalSuccessLogin = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>Welcome to OsteoSense!</Modal.Body>
    </Modal>
  );
};

export default ModalSuccessLogin;
