import React from "react";

import "../style.css";

const BtnContainer = ({ handleChange, handleSelectAmt }) => {
  return (
    <div className="d-flex gap-3 flex-wrap justify-content-center">
      {[51, 101, 201, 501, 1001, "Other"].map((item) =>
        item === "Other" ? (
          <div className="other-input">
            <span>₹&nbsp;</span>
            <input
              key={item}
              className="bg-transparent "
              id="name"
              name="name"
              placeholder="Other"
              // value={formData.name || ""}
              type="number"
              onChange={handleChange}
            />
          </div>
        ) : (
          <button
            onClick={() => handleSelectAmt(item)}
            className={`btn ac_btn`}
            key={item}
            style={{ minWidth: "5rem" }}
          >
            {"₹ " + item}
          </button>
        )
      )}
    </div>
  );
};

export default BtnContainer;
