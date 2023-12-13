import React from "react";
import s60 from "../../../assets/images/s60.jpeg";

import "../style.css";
import { FaPlus } from "react-icons/fa";

const AlertModal = ({ handleCloseModal, device }) => {
  return (
    <div onClick={handleCloseModal} className="alert-modal flex-utility">
      <div className="flex-utility data-container">
        <FaPlus onClick={handleCloseModal} className="close-btn" />
        <div className="modal-data">
          <div>🌟 Goal Achieved! Funding Closed! 🌟</div>
          <img
            src={device?.productImage || s60}
            alt="s60"
            className="d-block mx-auto w-50"
          />
          <div className="fs-6 fw-light fst-italic text-center">
            {device?.productName || "Fund for Device Elegato HD60 S"}
          </div>
          <div> Dear Visitor,</div>
          <div>
            Exciting news! Thanks to your amazing support, we've reached our
            donation goal. 🎉 Funding is now closed. A heartfelt thank you for
            making a difference!
          </div>
          <div>Gratefully, Xhunter</div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
