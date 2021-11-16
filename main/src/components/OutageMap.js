import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import ReportOutage from "./ReportOutage";

function OutageIndicator({ outage }) {
  //this component renders the markers with corresponding lat and long values calculated by the geocodify api.
  const [coords, setCoords] = useState();
  //localStorage.clear();
  //console.log(JSON.parse(localStorage.getItem("user")));
  const localUser = localStorage.getItem("user");
  const userEmail = '"' + outage.user_email + '"';
  console.log(localUser);
  // localUser user has "" around it so "" is added around outage.user_email so that it would satisfy the condition on line 40-66
  // if (localUser === userEmail) {
  //   console.log("user exist");
  // } else {
  //   console.log("User does not exist");
  // }

  const [isLoggedIn, setIsLoggedIn] = useState(localUser === userEmail); //localStorage.getItem("user") === outage.user_email

  const closeReport = async (event) => {
    event.preventDefault();
    const res = await axios.post("/outage-close", {
      outage_id: `${outage.outage_id}`
    });
    console.log(res.status);
  };

  function extendReport() {
    console.log("Extending Report");
  }

  useEffect(() => {
    function resolveLocation() {
      let lng = Number(outage.longitude);
      let lat = Number(outage.latitude);
      setCoords({ lng, lat });
    }
    resolveLocation();
  }, [outage]);

  if (!coords) {
    return "Loading";
  } else if (isLoggedIn) {
    return (
      <Marker position={[coords.lat, coords.lng]}>
        <Popup className={outage.service_type}>
          {outage.service_type}: {outage.service_name}
          <button onClick={closeReport}>
            {" "}
            {/* onClick event handlers for closing and extending reports*/}
            Close Report
          </button>
          <button onClick={extendReport}>Extend Report</button>
          {}
        </Popup>
      </Marker>
    );
  } else {
    return (
      <Marker position={[coords.lat, coords.lng]}>
        <Popup className={outage.service_type}>
          {outage.service_type}: {outage.service_name}
        </Popup>
      </Marker>
    );
  }
}

function OutageMap() {
  //This is where the map page will be rendered.
  const [allOutages, setAllOutages] = useState([]);
  console.log(allOutages);
  const [reportIsOpen, setReportIsOpen] = useState(false);

  navigator.geolocation.getCurrentPosition(function (position) {
    var realLat = position.coords.latitude;
    var realLong = position.coords.longitude;

    var offsetLat = realLat.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]; //offset coords by truncating to 3 decimals without rounding
    var offsetLong = realLong.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];

    localStorage.setItem("latitude", offsetLat);
    localStorage.setItem("longitude", offsetLong);
  });
  //This function requests the browser user to allow location information to be used. Used to get user Lat Long Coords
  const setReportIsOpenTrue = () => {
    setReportIsOpen(true);
  };
  const setReportIsOpenFalse = () => {
    setReportIsOpen(false);
  };

  useEffect(() => {
    async function fetchOutages() {
      const resp = await axios.get("/outages");
      setAllOutages(resp.data.outages);
    }
    fetchOutages();
  }, []);

  return (
    <>
      <button onClick={setReportIsOpenTrue}>Report Outage</button>
      <MapContainer center={[44, -85]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {allOutages.map((mock) => (
          <OutageIndicator outage={mock} />
        ))}
      </MapContainer>
      <Modal id="modal-container" isOpen={reportIsOpen}>
        <button onClick={setReportIsOpenFalse}>X</button>
        <ReportOutage />
      </Modal>
    </>
  );
}

export default OutageMap;
