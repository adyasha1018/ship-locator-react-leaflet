import React, { useState } from "react";
import ship1Data from "../data/ship1";
import * as ship2Data from "../data/ship2.json";

import ShipComponent from "./ShipComponent";

const HomePage = () => {
  const [showShip1, setShowShip1] = useState(false);
  const [showShip2, setShowShip2] = useState(false);
  const btnStyle = {
    padding: "10px 20px",
    backgroundColor: "#386fb3",
    margin: "0 10px",
    border: "3px solid #120831f7",
    color: "white",
    fontSize: "18px",
    opacity: "0.7",
  };
  function showShip1Details() {
    setShowShip1(true);
    setShowShip2(false);
  }
  function showShip2Details() {
    setShowShip2(true);
    setShowShip1(false);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center" }}>Welcome To Ship Locator Project</h1>
      <h3 style={{ textAlign: "center" }}>
        Select any ship to see ship location on map and speed history
      </h3>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <button style={btnStyle} onClick={showShip1Details}>
          First Ship
        </button>
        <button onClick={showShip2Details} style={btnStyle}>
          Second Ship
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {showShip1 ? (
          <ShipComponent name="First Ship" data={ship1Data} />
        ) : null}
        {showShip2 ? (
          <ShipComponent name="Second Ship" data={ship2Data.default} />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
