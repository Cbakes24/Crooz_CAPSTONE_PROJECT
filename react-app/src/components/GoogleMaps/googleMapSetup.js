import { useMemo, useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const HomeMap = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 43.11016617798622, lng: -89.48826131670266 });
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  const containerStyle = {
    width: '800px',
    height: '800px'
  };

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  if (!isLoaded) return <div>...Loading</div>;
  return (
    // Important! Always set the container height explicitly
    <div className="map_page__container">
      <div style={{ height: '2002px', width: '900px' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={5}
          center={currentPosition}

        >
        </GoogleMap>
      </div>
    </div>
  );
};

export default HomeMap;
// const  Map = () => {

//     return (
//         <GoogleMap
//         zoom={10}
//         center={{lat: 30, lng: -30}}
//         mapContainerClassName="map-container"
//         >


//         </GoogleMap>
//     )
// }

// export default HomeMap
