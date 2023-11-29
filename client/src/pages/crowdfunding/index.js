import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import donationImg from "../../assets/images/donate.jpeg";
import "./style.css";

export const CrowdFunding = () => {
  const [donationAmt, setDonationAmt] = useState(0);

  const handleSelectAmt = (amt) => {
    setDonationAmt(Number(amt));
  };

  const handleChange = (event) => {
    const num = Number(event.target.value);
    if (typeof num === "number") {
      setDonationAmt(num);
    }
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | CrowdFunding</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-lg-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Funding</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="6">
            <img src={donationImg} alt="donationImg" className="w-100" />
          </Col>
          <Col lg="6" className="d-flex mt-5 mt-lg-0">
            <div>
              <h6 className="display-4 mb-4 fs-3 text-center ">
                Donate to our Community
              </h6>
              <p className="text-center fs-6">
                Your donation helps us to offer and serve better services.
                <br /> Your contribution, however big or small, is valuable for
                our future.
              </p>
              <div className="d-flex gap-3 flex-wrap justify-content-center">
                {[51, 101, 201, 501, 1001, "Other"].map((item) =>
                  item === "Other" ? (
                    <input
                      className="bg-transparent other-input"
                      id="name"
                      name="name"
                      placeholder="Other"
                      // value={formData.name || ""}
                      type="number"
                      onChange={handleChange}
                    />
                  ) : (
                    <button
                      onClick={() => handleSelectAmt(item)}
                      className="btn ac_btn"
                      key={item}
                      style={{ minWidth: "5rem" }}
                    >
                      {item !== "Other" && "₹"}
                      {item}
                    </button>
                  )
                )}
              </div>
              <button
                id="button_p"
                style={{
                  minWidth: "10rem",
                  maxWidth: "11rem",
                  overflow: "clip",
                  whiteSpace: "nowrap",
                }}
                className="btn ac_btn mt-5 mx-auto w-auto d-block"
                type="submit"
              >
                DONATE {donationAmt ? " ₹" + donationAmt : ""}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      ;
    </HelmetProvider>
  );
};