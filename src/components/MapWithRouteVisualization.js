import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { decode } from "@googlemaps/polyline-codec";
import axios from "axios";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { zoomIn, zoomOut, selectMapZoom } from "../Redux/slice.js";


const handleZoomOut = () => {
  dispatch(zoomOut());
  if (mapRef.current) {
    const map = mapRef.current;
    map.setZoom(mapZoom - 1);
  }
}
// MapCard component containing the map contents
const MapCard = ({ decodedRoute, tollMarkers, destinationMarker, mapRef, handleMapClick }) => (
  <Card style={{ margin: "20px" }}>
    <CardContent>
      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[0, 0]}
          zoom={5}
          style={{ height: "80%", width: "100%" }}
          ref={mapRef}
          onClick={handleMapClick}
        >
          {/* Placeholder for TileLayer */}
          <TileLayer
            attribution="Tiles © Google Maps"
            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0"]}
          />

          {/* Example for Polyline */}
          {decodedRoute.length > 0 && (
            <Polyline positions={decodedRoute} color="blue" />
          )}

          {/* Example for displaying Toll Markers as Markers with Popup */}
          {tollMarkers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup>{marker.details}</Popup>
            </Marker>
          ))}

          {/* Example for Destination Marker */}
          {destinationMarker && (
            <Marker position={destinationMarker.position}>
              <Popup>Destination</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </CardContent>
  </Card>
);

const DestinationCard = ({ onSubmit, startDestination, endDestination, onInputChange }) => (
  <Card style={{ margin: "20px" }}>
    <CardContent>
      <form onSubmit={onSubmit}>
        <TextField
          label="Start Destination"
          variant="outlined"
          fullWidth
          value={startDestination}
          onChange={(e) => onInputChange("start", e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="End Destination"
          variant="outlined"
          fullWidth
          value={endDestination}
          onChange={(e) => onInputChange("end", e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button style={{marginInline:"10px"}} variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </CardContent>
  </Card>
);

const MapWithRouteVisualization = () => {
  const [decodedRoute, setDecodedRoute] = useState([]);
  const [tollMarkers, setTollMarkers] = useState([]);
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [mapZoom, setMapZoom] = useState(5);
  
  const mapRef = useRef();

  useEffect(() => {
    const fetchRouteFromTollGuru = async () => {
      try {
        const response = await axios.get(
          "https://apis.tollguru.com/toll/v2/complete-polyline-from-mapping-service/phNQpRfjggDdFPGnLbNbNQPgt7gJF4jR"
        );
        const encodedPolyline = response.data.route.encoded_polyline;
        const decodedPolyline = decode(encodedPolyline);
        setDecodedRoute(decodedPolyline);

        const tollMarkersData = response.data.toll_markers;
        const markers = tollMarkersData.map((marker) => ({
          position: [marker.lat, marker.lng],
          details: marker.details,
        }));
        setTollMarkers(markers);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRouteFromTollGuru();
  }, []);

  const handleInputChange = (type, value) => {
    if (type === "start") {
      setStartDestination(value);
    } else if (type === "end") {
      setEndDestination(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("startDestination", startDestination);
    localStorage.setItem("endDestination", endDestination);
    alert("Route calculation completed");
    setStartDestination("");
    setEndDestination("");
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const newMarker = {
      position: [lat, lng],
    };
    setDestinationMarker(newMarker);

    if (mapRef.current) {
      const map = mapRef.current;
      if (mapZoom === 5) {
        map.setZoom(8);
      } else {
        map.setZoom(5);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <DestinationCard
          onSubmit={handleSubmit}
          startDestination={startDestination}
          endDestination={endDestination}
          onInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MapCard
          decodedRoute={decodedRoute}
          tollMarkers={tollMarkers}
          destinationMarker={destinationMarker}
          mapRef={mapRef}
          handleMapClick={handleMapClick}
        />
      </Grid>
    </Grid>
  );
};

export default MapWithRouteVisualization;
