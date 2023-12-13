import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import AppRoutes from "./routes";
import Headermain from "../header";
import withRouter from "../hooks/withRouter";
import AnimatedCursor from "../hooks/AnimatedCursor";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  // const isFundCollected = useSelector((state) => state.appSlice.fundingModal);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      {/* {isFundCollected && <AlertModal />} */}
      <ScrollToTop>
        <Headermain />
        <AppRoutes />
      </ScrollToTop>
    </Router>
  );
}
