import { useState, useEffect } from "react";
import React from "react";
import '../Booking/booking.css'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";


export default function Home({ city, locationVehicles }) {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [currentAddress, setCurrentAddress] = useState({ lat: 0, lng: 0 });
  const [addresses, setAddresses] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState("");

  // Wait for Google Maps API to be available
  useEffect(() => {
    const loadMap = async () => {
      while (!window.google?.maps) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // converts an address to lat lng
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

      // setting up the markers from the vehicle addresses
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

      Promise.all(
        locationVehicles.map((vehicle) => geocodeAddress(vehicle.address))
      )
        .then((locations) => {
          setAddresses(locations);
        })
        .catch((error) => {
          console.error(
            "Geocode was not successful for the following reason: " + error
          );
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
        mapContainerStyle={containerStyle} 
        center={currentPosition} // automatically centers the map on the coordinates
        zoom={12}
      >
        {addresses.map((address, index) => (
          <Marker
            key={index}
            position={address}
            onClick={() => {
              setSelectedMarker(locationVehicles[index]);
            }}
          />
        ))}

        {selectedMarker && (
  <InfoWindow
    position={addresses.find((address, index) => locationVehicles[index] === selectedMarker)}
    onCloseClick={() => setSelectedMarker(null)}
  >
    <div>
    <img className='marker-image' src={selectedMarker.picture} alt="vehicle" />
      <h3>
        {selectedMarker.year} {selectedMarker.make} {selectedMarker.model}
      </h3>
    </div>
  </InfoWindow>
)}
      </GoogleMap>
    </LoadScript>
  );
}
