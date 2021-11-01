import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";
import ReportOutage from "./ReportOutage"

function OutageIndicator({ outage }) {
  //this component renders the markers with corresponding lat and long values calculated by the geocodify api.
  const [coords, setCoords] = useState();

  useEffect(() => {
    async function resolveLocation() {
      const resp = await axios.get(
        "https://api.geocodify.com/v2/geocode/json?api_key=1e79b746ca6813d40e4e997e4a4e263f1307e5eb&q=" +
          outage.outage_street +
          ", " +
          outage.outage_city +
          ", Michigan, USA"
      );
      const [lng, lat] = resp.data.response.bbox;
      setCoords({ lng, lat });
    }
    resolveLocation();
  }, [outage]);

  return !coords ? (
    "Loading"
  ) : (
    <Marker position={[coords.lat, coords.lng]}>
      <Popup>
        {outage.service_type}: {outage.service_name}
      </Popup>
    </Marker>
  );
}

function OutageMap() {
  //This is where the map page will be rendered.
  const [allOutages, setAllOutages] = useState([]);
  const [reportIsOpen, setReportIsOpen] = useState(false);
  const setReportIsOpenTrue = () =>{
    setReportIsOpen(true);
  }
  const setReportIsOpenFalse = () =>{
    setReportIsOpen(false);
  }

  useEffect(() => {
    async function fetchOutages() {
      const resp = await axios.get("/outages");
      setAllOutages(resp.data.outages);
    }
    fetchOutages();
  }, []);
  console.log(allOutages);
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
        <ReportOutage/>
      </Modal>
    </>
  );
}

export default OutageMap;
