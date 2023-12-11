import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";

import { donationPageData, meta } from "../../content_option";
import useDonation from "../../hooks/useDonation";
import donationImg from "../../assets/images/elegato.jpeg";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyProgressBar from "./components/ProgressBar";
import DonarList from "./components/DonarList";
import BtnContainer from "./components/BtnContainer";
import AlertModal from "./components/AlertModal";

export const CrowdFunding = () => {
  const {
    handleSelectAmt,
    handleChange,
    handleDonate,
    handleCloseModal,
    donationAmt,
    progressBarStats,
    donatedYet,
    fundDetails,
    fetchingStatus,
    isFundCollected,
  } = useDonation();

  return (
    <HelmetProvider>
      <Container className="relative">
        {isFundCollected && <AlertModal {...{ handleCloseModal }} />}
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | CrowdFunding</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-lg-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> {donationPageData.title}</h1>
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
                {donationPageData.heading}
              </h6>
              <p className="text-center fs-6">{donationPageData.description}</p>
              <BtnContainer {...{ handleChange, handleSelectAmt }} />
              <button
                disabled={fetchingStatus.loadingDonation}
                id="button_p"
                className="btn ac_btn mt-5 mx-auto w-auto d-block donate-btn"
                type="submit"
                onClick={handleDonate}
              >
                {fetchingStatus.loadingDonation ? (
                  <span>Loading...</span>
                ) : (
                  <span>DONATE {donationAmt ? " ₹" + donationAmt : ""}</span>
                )}
              </button>
	      <br />
              <p className="text-center fs-6">
	  	Pay via UPI at <b>xhunter@upi</b> and drop a mail so I can add you as a backer :) 
              </p>
            </div>
          </Col>
        </Row>
        <Row className="progress-bar-container col-lg-11 mx-auto">
          <h6 className="fs-3 mb-3 p-0">Backing Progress</h6>
          {fetchingStatus.loadingProgressBar ? (
            <div className="p-0">Loading...</div>
          ) : progressBarStats >= 0 ? (
            <MyProgressBar {...{ progressBarStats, donatedYet, fundDetails }} />
          ) : (
            <div className="fs-6 p-0">No data available.</div>
          )}
        </Row>

        <Row className="mt-5 col-lg-11 mx-auto ">
          <h6 className="fs-3 mb-3 p-0">Backer Details</h6>
          {fetchingStatus.loadingProgressBar ? (
            "Loading..."
          ) : (
            <>
              <table>
                <thead>
                  <tr className="fw-bold fs-6 table-head-row">
                    <td>S.No</td>
                    <td>Name</td>
                    <td>Amount</td>
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
            </>
            <DonarList {...{ fundDetails }} />
          )}
          {!fundDetails?.length && (
            <div className="text-center py-5">No data available</div>
          )}
        </Row>
      </Container>
      ;
    </HelmetProvider>
  );
};
