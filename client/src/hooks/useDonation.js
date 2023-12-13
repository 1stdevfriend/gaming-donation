import { useState } from "react";
import { useDispatch } from "react-redux";

import client from "../utils/api";
import { updateModalState } from "../features/appSlice";

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
  // const isFundCollected = useSelector((state) => state.appSlice.fundingModal);

  const [device, setDevice] = useState(null);

  const dispatch = useDispatch();

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
      const res = await client.post("pay-now", {
        amt: donationAmt,
        ...device,
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

  const handleCloseModal = () => {
    setIsFundCollected(false);
  };

  const handleSelectDevice = async (productInfo) => {
    setDevice(productInfo);
    await handleFetchDeviceData(productInfo?.productName);
  };
  const handleFetchDeviceData = async (device) => {
    try {
      setFetchingStatus((pre) => ({ ...pre, loadingProgressBar: true }));
      const res = await client.get(`get-fund?device=${device}`);

      const userList = res?.data?.result?.donarList;
      if (!userList?.length) {
        setFetchingStatus(0);
        setFundDetails([]);
        setDonatedYet(0);
        setProgressBarStats(0);
        return;
      }
      setFundDetails(userList);
      let totalAmt = 0;
      for (let i = 0; i < userList.length; i++) {
        totalAmt = totalAmt + Number(userList[i].amt);
      }

      if (totalAmt) {
        setProgressBarStats((totalAmt * 100) / 10000);
        setDonatedYet(totalAmt);
        if (totalAmt >= 10000) {
          setIsFundCollected(true);
          dispatch(updateModalState(true));
        }
      } else {
        setDonatedYet(0);
        setProgressBarStats(0);
      }
      setFetchingStatus((pre) => ({ ...pre, loadingProgressBar: false }));
    } catch (error) {
      console.log("error", error?.message);
      window.alert("Unable to fetch fund progress details," + error?.message);
      setFetchingStatus(0);
      setFundDetails([]);
    }
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
    device,
    handleSelectDevice,
  };
};

export default useDonation;
