import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import donationImg from "../../assets/images/donate.jpeg";
import { PaytmButton } from "../../paytm-button/paytmButton";

export const CrowdFunding = () => {
  const [donationAmt, setDonationAmt] = useState(0);
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
            <h1 className="display-4 mb-4">Crowd Funding</h1>
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
                {[5, 10, 40, 50, 100, 200].map((item) => (
                  <button
                    onClick={() => {
                      setDonationAmt(Number(item));
                    }}
                    className="btn ac_btn"
                    key={item}
                    style={{ minWidth: "5rem" }}
                  >
                    {item !== "Other" && "₹"}
                    {item}
                  </button>
                ))}
              </div>
              {/* <PaytmButton /> */}
              <button
                id="button_p"
                style={{ minWidth: "10rem" }}
                className="btn ac_btn mt-5 mx-auto w-auto d-block"
                type="submit"
                // onClick={makePayment}
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
