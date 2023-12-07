import React from "react";

import "../style.css";

const BtnContainer = ({ handleChange, handleSelectAmt }) => {
  return (
    <div className="d-flex gap-3 flex-wrap justify-content-center">
      {[51, 101, 201, 501, 1001, "Other"].map((item) =>
        item === "Other" ? (
          <div key={item} className="other-input">
            <span>₹&nbsp;</span>
            <input
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
            key={item}
            onClick={() => handleSelectAmt(item)}
            className={`btn ac_btn`}
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
