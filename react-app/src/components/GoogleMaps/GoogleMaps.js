import { useState, useEffect } from "react";
import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";


export default function Home({ city, locationVehicles }) {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [currentAddress, setCurrentAddress] = useState({ lat: 0, lng: 0 })
  const [addresses, setAddresses] = useState([]);


  useEffect(() => {
    const loadMap = async () => {
      // Wait for Google Maps API to be available
      while (!window.google?.maps) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const geocoderCity = new window.google.maps.Geocoder();
      geocoderCity.geocode({ address: city }, (results, status) => {
        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;
          console.log("RESULTSS!!!!!!", results);
          setCurrentPosition({ lat: lat(), lng: lng() });
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });

      const geocodeAddress = async (address) => {
        const geocoder = new window.google.maps.Geocoder();
        const results = await new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === "OK") {
              resolve(results);
            } else {
              reject(status);
            }
          });
        });
        const { lat, lng } = results[0].geometry.location;
        return { lat: lat(), lng: lng() };
      };

      Promise.all(locationVehicles.map((vehicle) => geocodeAddress(vehicle.address)))
        .then((locations) => {
          setAddresses(locations);
        })
        .catch((error) => {
          console.error("Geocode was not successful for the following reason: " + error);
        });




    };



    loadMap();



  }, [city, locationVehicles]);
  //     const { isLoaded } = useLoadScript({
  //         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  //     })

  const containerStyle = {
    width: "39%",
    height: "800px",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={containerStyle} // Youll most likely just want to use containerStyle for this
        center={currentPosition} // automatically centers the map on the coordinates
        zoom={12}
      >
       {addresses.map((address, index) => (
          <Marker key={index} position={address} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
