import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Location.css"


export default function Loading() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 51.4381, lng: 5.4752 }), []);

  return ( 
    <div>
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}">
    <Marker position={center} />
  </GoogleMap>
    <div className="lobbyContainer">
      <div className="joinLobby">
      <div className="lobbyProfilePicMap"> </div>
        <p className="lobbyTitleMap">
            Pedro's Lobby
          </p>
          {/* <p className="lobbyAreaMap">Area 51</p>  */}
      </div>
      <div className="joinLobby">
      <div className="lobbyProfilePicMap">

      </div>
      </div>
      <div className="joinLobby">
      <div className="lobbyProfilePicMap">

        </div>  
        </div>
    </div>
  </div>
  );
}