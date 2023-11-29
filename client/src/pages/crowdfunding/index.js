import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import donationImg from "../../assets/images/donate.jpeg";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const CrowdFunding = () => {
  const [donationAmt, setDonationAmt] = useState(0);
  const [progressBarStats, setProgressBarStats] = useState(0);
  const [donatedYet, setDonatedYet] = useState(0);
  const [fetchingStatus, setFetchingStatus] = useState({
    loadingDonation: false,
    loadingProgressBar: true,
  });

  const handleSelectAmt = (amt) => {
    setDonationAmt(Number(amt));
  };

  const handleChange = (event) => {
    const num = Number(event.target.value);
    if (typeof num === "number") {
      setDonationAmt(num);
    }
  };

  const handleDonate = async () => {
    try {
      if (!donationAmt) return;
      setFetchingStatus((pre) => ({ ...pre, loadingDonation: true }));
      const res = await axios.post("http://localhost:3006/paynow", {
        amt: donationAmt,
      });
      window.open(res.data.data, "_self");
      setFetchingStatus((pre) => ({ ...pre, loadingDonation: false }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFundDetails = async () => {
      try {
        setFetchingStatus((pre) => ({ ...pre, loadingProgressBar: true }));
        const res = await axios.get("http://localhost:3006/get-fund");
        const totalAmt = Number(res?.data?.data);

        if (!isNaN(totalAmt) && totalAmt) {
          setProgressBarStats((totalAmt * 100) / 10000);
          setDonatedYet(totalAmt);
        }
        setFetchingStatus((pre) => ({ ...pre, loadingProgressBar: false }));
      } catch (error) {
        console.log("error", error?.message);
      }
    };
    getFundDetails();
  }, []);

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
                      key={item}
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
                      {" ₹" + item}
                    </button>
                  )
                )}
              </div>
              <button
                disabled={fetchingStatus.loadingDonation}
                id="button_p"
                style={{
                  minWidth: "10rem",
                  maxWidth: "11rem",
                  overflow: "clip",
                  whiteSpace: "nowrap",
                }}
                className="btn ac_btn mt-5 mx-auto w-auto d-block"
                type="submit"
                onClick={handleDonate}
              >
                {fetchingStatus.loadingDonation ? (
                  <span>Loading...</span>
                ) : (
                  <span>DONATE {donationAmt ? " ₹" + donationAmt : ""}</span>
                )}
              </button>
            </div>
          </Col>
        </Row>
        <div className="progress-bar-container">
          <h6 className="fs-3 mb-3">Fund Progress</h6>
          {fetchingStatus.loadingProgressBar ? (
            <div>Loading...</div>
          ) : progressBarStats ? (
            <>
              <ProgressBar>
                <ProgressBar
                  className="progress-bar-striped"
                  style={{
                    height: "16px",
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                  }}
                  label={progressBarStats + "%"}
                  variant="primary"
                  striped={true}
                  now={Number(progressBarStats.toFixed(2))}
                  key={1}
                  animated
                />
                <ProgressBar
                  label={(100 - progressBarStats).toFixed(2) + "%"}
                  // striped={true}
                  variant="secondary"
                  now={Number((100 - progressBarStats).toFixed(2))}
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
                  <br /> 40
                </div>
                <div>
                  GOAL
                  <br /> ₹10000
                </div>
              </div>
            </>
          ) : (
            <div className="fs-6">No data available.</div>
          )}
        </div>
      </Container>
      ;
    </HelmetProvider>
  );
};
