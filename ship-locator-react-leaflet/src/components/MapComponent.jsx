import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import marker from "../assets/marker.png";
import BarChartComponent from "./BarChartComponent";

function getRandomLatLong(data) {
  const counts = {};
  const sampleArray = data.map((item) => item.date);
  sampleArray.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  return Object.keys(counts);
}

const limeOptions = { color: "lime" };
const newicon = new L.icon({
  iconUrl: marker,
  iconSize: [30, 30],
});
const getFormattedDateTime = (date) => {
  const dateTimeFormatted =
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    "," +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds() +
    "." +
    date.getMilliseconds();
  return dateTimeFormatted;
};
const MapComponent = ({ data }) => {
  const dateArr = getRandomLatLong(data);
  const [positions, setPositions] = useState([]);
  const [time, setTime] = useState([]);
  const [speedData, setSpeedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [center, setCenter] = useState([63.34, -22.516]);
  
  const getSelectedDatePositions = (date, data) => {
    let latLongPosition = [];
    let dateTime = [];
    let speed = [];
    data.filter((item) => {
      if (item.date === parseInt(date)) {
        const date = new Date(item.date + item.time);
        dateTime.push(getFormattedDateTime(date));
        latLongPosition.push([item.latitude, item.longitude]);
        speed.push(item.speed);
      }
      return latLongPosition;
    });
    const center = latLongPosition[latLongPosition.length / 2]
      ? latLongPosition[latLongPosition.length / 2]
      : latLongPosition[(latLongPosition.length + 1) / 2];
    setCenter(center);
    setSelectedDate(date);
    setPositions(latLongPosition);
    setTime(dateTime);
    setSpeedData(speed);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems:"center" }}>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {dateArr.map((item, index) => (
          <button
            key={index}
            style={{
              margin: "5px",
              padding: "10px 20px",
              border: "2px dotted #b36b00",
              backgroundColor: "navajowhite",
              color: "#0079a9",
              fontWeight: "bolder",
              borderRadius: "5px",
            }}
            onClick={getSelectedDatePositions.bind(this, item, data)}
          >
            {item}
          </button>
        ))}
      </div>
      <strong style={{ textAlign: "center" }}>
        {selectedDate ? `Ship Locations on map for : ${selectedDate}` : ""}
      </strong>

      {positions.length > 0 ? (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <MapContainer
            center={center}
            zoom={6}
            scrollWheelZoom={false}
            width="100%"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Polyline pathOptions={limeOptions} positions={positions} />
            {positions.map((position, index) => {
              return (
                <Marker position={position} icon={newicon}>
                  <Popup>
                    Ship's location at: <br /> <strong>{time[index]}</strong>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <BarChartComponent data={speedData} time={selectedDate} />
        </div>
      ) : null}
    </div>
  );
};
export default MapComponent;
