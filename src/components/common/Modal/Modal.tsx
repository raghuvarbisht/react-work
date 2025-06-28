import React from 'react';
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="modal-close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
