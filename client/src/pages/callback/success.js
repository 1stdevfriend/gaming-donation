import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import img from "../../assets/images/thanks.gif";

import "./style.css";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigator = useNavigate();
  useEffect(() => {
    setTimeout(() => navigator("/donate"), 2500);
  }, []);
  return (
    <Container className="stripe-main d-flex justify-content-center align-items-center">
      <div className="">
        <img src={img} />
      </div>
    </Container>
  );
};
