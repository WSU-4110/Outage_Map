import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import { geosearch, arcgisOnlineProvider } from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import Modal from "react-modal";
import axios from "axios";
import ReportOutage from "./ReportOutage";
import Leaderboard from "./Leaderboard";
import { Button, Container, Row, Col } from "react-bootstrap";
import gaming from "./icons/gamepad-solid.svg";
import streaming from "./icons/video-slash-solid.svg";
import power from "./icons/plug-solid.svg";
import internet from "./icons/wifi-solid.svg";
import cable from "./icons/ethernet-solid.svg";
import website from "./icons/laptop-code-solid.svg";
import exclamation from "./icons/exclamation-solid.svg";

function OutageIndicator({ outage }) {
  const [coords, setCoords] = useState();
  const localUser = localStorage.getItem("user");
  const userEmail = '"' + outage.user_email + '"';

  const [isLoggedIn, setIsLoggedIn] = useState(localUser === userEmail); //localStorage.getItem("user") === outage.user_email

  const closeReport = async (event) => {
    event.preventDefault();
    const res = await axios.post("/outage-close", {
      outage_id: `${outage.outage_id}`,
    });
    console.log(res.status);
  };

  const extendReport = async (event) => {
    event.preventDefault();
    const res = await axios.post("/outage-extend", {
      outage_id: `${outage.outage_id}`,
    });
    console.log(res.status);
  };

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 35],
    },
  });

  const streamingIcon = new LeafIcon({
    iconUrl: streaming,
  });
  const powerIcon = new LeafIcon({
    iconUrl: power,
  });
  const internetIcon = new LeafIcon({
    iconUrl: internet,
  });
  const gamingIcon = new LeafIcon({
    iconUrl: gaming,
  });
  const exclamationIcon = new LeafIcon({
    iconUrl: exclamation,
  });
  const cableIcon = new LeafIcon({
    iconUrl: cable,
  });
  const websiteIcon = new LeafIcon({
    iconUrl: website,
  });

  const [icon, setIcon] = useState(powerIcon);

  useEffect(() => {
    function resolveLocation() {
      let lng = Number(outage.longitude);
      let lat = Number(outage.latitude);
      switch (outage.service_type) {
        case "Streaming":
          setIcon(streamingIcon);
          break;
        case "Power":
          setIcon(powerIcon);
          break;
        case "Internet":
          setIcon(internetIcon);
          break;
        case "Gaming Platform":
          setIcon(gamingIcon);
          break;
        case "Cable":
          setIcon(cableIcon);
          break;
        case "Website":
          setIcon(websiteIcon);
          break;
        default:
          setIcon(exclamationIcon);
      }
      setCoords({ lng, lat });
    }
    resolveLocation();
  }, [outage]);

  if (!coords) {
    return "Loading";
  } else if (isLoggedIn) {
    return (
      <Marker position={[coords.lat, coords.lng]} icon={icon}>
        <Popup className={outage.service_type}>
          {outage.service_type}: {outage.service_name}
          <br />
          Description: {outage.outage_description}
          <br />
          <br />
          <button onClick={closeReport}>
            {/* onClick event handlers for closing and extending reports*/}
            Close Report
          </button>
          {" "}
          <button onClick={extendReport}>Extend Report</button>
          {}
        </Popup>
      </Marker>
    );
  } else {
    return (
      <Marker position={[coords.lat, coords.lng]} icon={icon}>
        <Popup className={outage.service_type}>
          {outage.service_type}: {outage.service_name}
          <br />
          Description: {outage.outage_description}
          <br />
        </Popup>
      </Marker>
    );
  }
}

function OutageMap() {
  //This is where the map page will be rendered.
  const [allOutages, setAllOutages] = useState([]);
  //console.log(allOutages);
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

  const [mapRef, setMapRef] = useState();

  useEffect(() => {
    async function fetchOutages() {
      const resp = await axios.get("/outages");
      setAllOutages(resp.data.outages);
    }
    fetchOutages();

    const map = mapRef; //reference to map container

    if (!map) return; //if reference not found, do not render

    const control = geosearch({
      useMapBounds: false,
      providers: [
        arcgisOnlineProvider({
          // API Key to be passed to the ArcGIS Online Geocoding Service
          apikey:
            "AAPK79891099930141d58d6591638ebcec16Hx8LOh64nCnFYAdXqPkxslM7cc9ZG1NcLO2ULi0hX2v2r9Dob-GhcGSgDbj9PYYX", //need to hide key
        }),
      ],
    });

    control.addTo(map);
  }, [mapRef]);

  return (
    <>
      <Col className="m-3 mx-auto w-25">
        <Row>
          <Button
            onClick={setReportIsOpenTrue}
            variant="primary btn-block"
            size="md"
            style={{ background: "orange", border: "none" }}
          >
            Report Outage
          </Button>
        </Row>
      </Col>

      <MapContainer
        whenCreated={setMapRef}
        center={
          JSON.parse(localStorage.getItem("latitude")) == null
            ? [44, -85]
            : [
                localStorage.getItem("latitude"),
                localStorage.getItem("longitude"),
              ]
        }
        zoom={JSON.parse(localStorage.getItem("latitude")) == null ? 7 : 12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl>
          <LayersControl.Overlay checked name="Power">
            <FeatureGroup>
              {allOutages.map((mock) =>
                mock.service_type === "Power" ? (
                  <OutageIndicator outage={mock} sortType />
                ) : null
              )}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Streaming">
            <FeatureGroup>
              {allOutages.map((mock) =>
                mock.service_type === "Streaming" ? (
                  <OutageIndicator outage={mock} sortType />
                ) : null
              )}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Internet">
            <FeatureGroup>
              {allOutages.map((mock) =>
                mock.service_type === "Internet" ? (
                  <OutageIndicator outage={mock} sortType />
                ) : null
              )}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Cable">
            <FeatureGroup>
              {allOutages.map((mock) =>
                mock.service_type === "Cable" ? (
                  <OutageIndicator outage={mock} sortType />
                ) : null
              )}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Gaming Platform">
            <FeatureGroup>
              {allOutages.map((mock) =>
                mock.service_type === "Gaming Platform" ? (
                  <OutageIndicator outage={mock} sortType />
                ) : null
              )}
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Website">
            <FeatureGroup>
              {allOutages.map((mock) =>
                mock.service_type === "Website" ? (
                  <OutageIndicator outage={mock} sortType />
                ) : null
              )}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

      <Modal id="modal-container" isOpen={reportIsOpen}>
        <Button
          onClick={setReportIsOpenFalse}
          style={{ background: "black", border: "none" }}
        >
          X
        </Button>

        <ReportOutage />
      </Modal>

      <Leaderboard tableData={allOutages} />
    </>
  );
}

export default OutageMap;
