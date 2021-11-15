import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import Modal from "react-modal";
import axios from "axios";
import ReportOutage from "./ReportOutage";
import gaming from "./icons/gamepad-solid.svg"
import streaming from "./icons/video-slash-solid.svg"
import power from "./icons/plug-solid.svg"
import internet from "./icons/wifi-solid.svg"
import cable from "./icons/ethernet-solid.svg"
import website from "./icons/laptop-code-solid.svg"
import exclamation from "./icons/exclamation-solid.svg"

function OutageIndicator({ outage }) {
  //this component renders the markers with corresponding lat and long values calculated by the geocodify api.
  const [coords, setCoords] = useState();
  //localStorage.clear();
  //console.log(JSON.parse(localStorage.getItem("user")));

  const LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 35],
    }
  });

  const streamingIcon = new LeafIcon({
    iconUrl: streaming
  });
  const powerIcon = new LeafIcon({
    iconUrl: power
  });
  const internetIcon = new LeafIcon({
    iconUrl: internet
  });
  const gamingIcon = new LeafIcon({
    iconUrl: gaming
  });
  const exclamationIcon = new LeafIcon({
    iconUrl: exclamation
  });
  const cableIcon = new LeafIcon({
    iconUrl: cable
  });
  const websiteIcon = new LeafIcon({
    iconUrl: website
  });

  const [icon, setIcon] = useState(powerIcon);

  useEffect(() => {
    function resolveLocation() {
      let lng = Number(outage.longitude);
      let lat = Number(outage.latitude);
      switch(outage.service_type) {
        case "Streaming":
          setIcon(streamingIcon)
          break;
        case "Power":
          setIcon(powerIcon)
          break;
        case "Internet":
          setIcon(internetIcon)
          break;
        case "Gaming":
          setIcon(gamingIcon)
          break;
        case "Cable":
          setIcon(cableIcon)
          break;
        case "Website":
          setIcon(websiteIcon)
          break;
        default:
          setIcon(exclamationIcon)
      }
      setCoords({ lng, lat });
    }
    resolveLocation();
  }, [outage]);

  return !coords ? (
    "Loading"
  ) : (
    <Marker position={[coords.lat, coords.lng]} icon={icon}>
      <Popup className={outage.service_type}>
        {outage.service_type}: {outage.service_name}
      </Popup>
    </Marker>
  );
}

function OutageMap() {
  //This is where the map page will be rendered.
  const [allOutages, setAllOutages] = useState([]);
  const [reportIsOpen, setReportIsOpen] = useState(false);

  navigator.geolocation.getCurrentPosition(function (position) {
    //console.log("Latitude is :", position.coords.latitude);
    //console.log("Longitude is :", position.coords.longitude);

    var realLat = position.coords.latitude;
    var realLong = position.coords.longitude;

    var offsetLat = realLat.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]; //offset coords by truncating to 3 decimals without rounding
    var offsetLong = realLong.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];

    localStorage.setItem("latitude", offsetLat);
    localStorage.setItem("longitude", offsetLong);
  }); //This function requests the browser user to allow location information to be used. Used to get user Lat Long Coords

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
        <ReportOutage />
      </Modal>
    </>
  );
}

export default OutageMap;
