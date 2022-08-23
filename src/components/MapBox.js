/* import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import markers from "./markers.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXoxenMiLCJhIjoiY2t6cjNmMnNyM3hlaTJ2bnk4MzVzNnNndCJ9.GzqIA_S4adSYJHH-4r9T4w";

export default function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      function (position) {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [position.coords.longitude, position.coords.latitude],
          zoom: zoom,
        });
        new mapboxgl.Marker({ color: 'black', rotation: 45 })
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(map);
      },
      function (error) {
        alert("Please accept geolocation permission", error);
      }
    );
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
 */

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import geoJson from "./markers.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [center, setCenter] = useState([-87.65, 41.84]);

  // Initialize map when component mounts
  useEffect(() => {
    // Create default markers

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 10,
    });
    geoJson.features.map((feature) => {
      const popup = new mapboxgl.Popup().setText(
        "Construction on the Washington Monument began in 1848."
      );
      return new mapboxgl.Marker()
        .setLngLat(feature.geometry.coordinates)
        .addTo(map)
        .setPopup(popup);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    navigator.geolocation.getCurrentPosition((pos) => {
      map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude] });
    });
    axios.get("http://localhost:5000/api/ev/allevent").then((response) => {
      console.log(response)

      response.data.forEach((event) => {
       
        
        const popup = new mapboxgl.Popup().setHTML(`<h2>${event.title}</h2><br><button type="button" class="btn btn-dark"><a href="/h/${event._id}">Register</a></button>`)
        return new mapboxgl.Marker()
          .setLngLat({ lng: event.lon, lat: event.lat })
          .addTo(map)
          .setPopup(popup);
      });
    });
    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
