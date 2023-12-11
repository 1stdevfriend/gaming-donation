import React from "react";
import { ProgressBar } from "react-bootstrap";

import "../style.css";

const MyProgressBar = ({ progressBarStats, donatedYet, fundDetails }) => {
  return (
    <>
      <ProgressBar className="fund-progress-bar">
        <ProgressBar
          className="progress-bar-striped"
          style={{
            height: "16px",
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
          }}
          label={
            (Number(progressBarStats) > 100 ? 100 : progressBarStats) + "%"
          }
          variant="secondary"
          striped={true}
          now={Number(progressBarStats.toFixed(2))}
          key={1}
          animated
        />
        <ProgressBar
          variant="secondary"
          now={
            Number((100 - progressBarStats).toFixed(2)) > 0
              ? Number((100 - progressBarStats).toFixed(2))
              : 0
          }
          key={2}
          style={{
            height: "16px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        />
      </ProgressBar>
      <div className="progress-bar-info">
        <div>
          RAISED <br /> ₹{donatedYet}
        </div>
        <div>
          DONATIONS
          <br /> {fundDetails?.length || 0}
        </div>
        <div>
          GOAL
          <br /> ₹10000
        </div>
      </div>
    </>
  );
};

export default MyProgressBar;
