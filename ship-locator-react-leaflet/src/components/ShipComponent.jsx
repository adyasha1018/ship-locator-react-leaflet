import React from "react";
import MapComponent from "./MapComponent";

const Ship1Component = ({ name, data }) => (
  <div>
    <section style={{textAlign: "center", padding:"10px"}}>
      <h3>Displayed data for: {name}</h3>
      <strong>
        Click on the grouped timestamp to display travel direction on map and speed
        respective to the time and location
      </strong>
    </section>

    <MapComponent data={data} />
  </div>
);

export default Ship1Component;
