import { useEffect, useState } from "react";
import client from "../utils/api";

const useDonation = () => {
  const [isFundCollected, setIsFundCollected] = useState(false);
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
      const res = await client.post("paynow", {
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
        const res = await client.get("get-fund");
        const totalAmt = Number(res?.data?.totalAmt);

        if (!isNaN(totalAmt) && totalAmt) {
          setProgressBarStats((totalAmt * 100) / 10000);
          setDonatedYet(totalAmt);
          if (totalAmt >= 10000) setIsFundCollected(true);
        } else {
          setDonatedYet(0);
          setProgressBarStats(0);
        }
        if (res?.data?.documents?.length) setFundDetails(res?.data?.documents);
        else setFundDetails([]);
        setFetchingStatus((pre) => ({ ...pre, loadingProgressBar: false }));
      } catch (error) {
        console.log("error", error?.message);
        window.alert("Unable to fetch fund progress details," + error?.message);
        setFetchingStatus(0);
        setFundDetails([]);
      }
    };
    getFundDetails();
  }, []);

  const handleCloseModal = () => {
    setIsFundCollected(false);
  };

  return {
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
  };
};

export default useDonation;
