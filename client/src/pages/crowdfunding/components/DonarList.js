import React from "react";

import "../style.css";

const DonarList = ({ fundDetails }) => {
  return (
    <table>
      <thead>
        <tr className="fw-bold fs-6 table-head-row">
          <td>S.No</td>
          <td>DONAR NAME</td>
          <td>DONATED AMOUNT</td>
        </tr>
      </thead>
      <tbody>
        {fundDetails
          ?.slice(0)
          .reverse()
          .map((item, i) => (
            <tr key={item.amt + item.name + i} className="table-body-row">
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{"₹ " + item.amt}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DonarList;
