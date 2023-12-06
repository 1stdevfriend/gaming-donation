import React from "react";

import "../style.css";
import { FaPlus } from "react-icons/fa";

const AlertModal = () => {
  return (
    <div className="alert-modal flex-utility">
      <div className="flex-utility data-container">
        <FaPlus className="close-btn" />
        <div className="modal-data">
          <div>🌟 Goal Achieved! Funding Closed! 🌟</div>{" "}
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
