import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import "./style.css";
import { useNavigate } from "react-router-dom";

export const Cancel = () => {
  const navigator = useNavigate();
  useEffect(() => {
    setTimeout(() => navigator("/donate"), 1000);
  }, [navigator]);
  return (
    <Container className="stripe-main d-flex justify-content-center align-items-center">
      <div className="fs-2">Oops, payment failed 🙁</div>
    </Container>
  );
};
