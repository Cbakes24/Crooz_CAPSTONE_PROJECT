import { useMemo, useState, useEffect } from "react";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Home({city}) {
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        const loadMap = async () => {
          // Wait for Google Maps API to be available
          while (!window.google?.maps) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: city }, (results, status) => {
            if (status === "OK") {
              const { lat, lng } = results[0].geometry.location;
              console.log("RESULTSS!!!!!!", results)
              setCurrentPosition({ lat: lat(), lng: lng() });
            } else {
              console.error("Geocode was not successful for the following reason: " + status);
            }
          });
        };
 
        loadMap();
      }, [city]);
  //     const { isLoaded } = useLoadScript({
  //         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  //     })

  const containerStyle = {
    width: '39%',
    height: '800px'
  };

  return (
<LoadScript
      googleMapsApiKey='AIzaSyBHOzuWX7MX862EHpW_4iJl_DZ5LX8TbNs'
    >
      <GoogleMap
        mapContainerStyle={containerStyle} // Youll most likely just want to use containerStyle for this
        center={currentPosition} // automatically centers the map on the coordinates
        zoom={11}
      >
        <Marker position={currentPosition} /> //drops a marker at the coordinates
      </GoogleMap>
</LoadScript>
  );
}
