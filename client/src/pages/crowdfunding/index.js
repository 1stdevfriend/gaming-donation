import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import donationImg from "../../assets/images/elegato.jpeg";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const CrowdFunding = () => {
  const [donationAmt, setDonationAmt] = useState(501);
  const [progressBarStats, setProgressBarStats] = useState(0);
  const [donatedYet, setDonatedYet] = useState(0);
  const [fundDetails, setFundDetails] = useState(null);
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
      const res = await axios.post("https://api.xhunter.in/paynow", {
        amt: donationAmt,
      });
      window.open(res.data.data, "_self");
      setFetchingStatus((pre) => ({ ...pre, loadingDonation: false }));
    } catch (error) {
      console.log(error);
      window.alert(
        'Unable to proceed your transaction,"' +
          error?.message +
          '" Try again later.'
      );
      setFetchingStatus((pre) => ({ ...pre, loadingDonation: false }));
      setDonationAmt(0);
    }
  };

  useEffect(() => {
    const getFundDetails = async () => {
      try {
        setFetchingStatus((pre) => ({ ...pre, loadingProgressBar: true }));
        const res = await axios.get("https://api.xhunter.in/get-fund");
        const totalAmt = Number(res?.data?.totalAmt);

        if (!isNaN(totalAmt) && totalAmt) {
          setProgressBarStats((totalAmt * 100) / 10000);
          setDonatedYet(totalAmt);
        }
        if (res?.data?.documents?.length) setFundDetails(res?.data?.documents);
        else setFundDetails(null);

        setFetchingStatus((pre) => ({ ...pre, loadingProgressBar: false }));
      } catch (error) {
        console.log("error", error?.message);
        window.alert("Unable to fetch fund progress details," + error?.message);
        setFetchingStatus(0);
        setFundDetails(null);
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
                Donate for Device Elegato HD S
              </h6>
              <p className="text-center fs-6">
                This device can help me capture premium quality game records.
                Throwing in your support can seriously level up my game
                recordings. Big or small, your contribution means the world to
                me!
              </p>
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
        <Row className="progress-bar-container col-lg-11 mx-auto">
          <h6 className="fs-3 mb-3 p-0">Fund Progress</h6>
          {fetchingStatus.loadingProgressBar ? (
            <div className="p-0">Loading...</div>
          ) : progressBarStats ? (
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
                    (Number(progressBarStats) > 100 ? 100 : progressBarStats) +
                    "%"
                  }
                  variant="secondary"
                  striped={true}
                  now={Number(progressBarStats.toFixed(2))}
                  key={1}
                  animated
                />
                <ProgressBar
                  label={(100 - progressBarStats).toFixed(2) + "%"}
                  // striped={true}
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
          ) : (
            <div className="fs-6 p-0">No data available.</div>
          )}
        </Row>

        <Row className="mt-5 col-lg-11 mx-auto ">
          {/* col-md-11 mx-auto col-lg-8 col-xl-6  */}
          <h6 className="fs-3 mb-3 p-0">Fund Details</h6>
          {fetchingStatus.loadingProgressBar ? (
            "Loading..."
          ) : fundDetails?.length ? (
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
                    <tr
                      key={item.amt + item.name + i}
                      className="table-body-row"
                    >
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{"₹ " + item.amt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            "No data available."
          )}
        </Row>
      </Container>
      ;
    </HelmetProvider>
  );
};
