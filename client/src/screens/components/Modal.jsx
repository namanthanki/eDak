import React, { useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ open }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggle = () => {
    setIsOpen(false);
  };

  return (
    <ReactDOM.Fragment>
      {isOpen ? (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal">
              <div className="modal-header">
                <button type="button" onClick={toggle}>
                  X
                </button>
              </div>
              <p>I am Modal!</p>
            </div>
          </div>
        </div>
      ) : null}
    </ReactDOM.Fragment>
  );
};

export default Modal;
