import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw",
  // height: "calc(100vh - 80px)",
  height: "100vh",
  position: "absolute",
};

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState({
    lng: -96,
    lat: 37.8,
    zoom: 4,
  });
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ3JlYXRuZXNzMTg3IiwiYSI6ImNrZWh4NWt1ZDE5cnkzMHM1OHBnZXRsdTMifQ.GWzxEKlT0aMWTLRNeBc-ow";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [location.lng, location.lat],
        zoom: location.zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      map.on("move", () => {
        setLocation({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapComponent;
