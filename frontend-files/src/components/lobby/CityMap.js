import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../../stylesheets/Location/CityMap.css"


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
      <div className="joinLobby container-border">
      <div className="default-container"></div>
      <div className="lobbyProfilePicMap"> </div>
      <div className="ContainerInfo">
        <p className="lobbyTitleMap">
            Pedro's Lobby
          </p>
          <div className="lobbyAreaInfo">
          <p className="lobbyAreaTitle"> <i className="fas fa-map-marker-alt"></i>Area 51</p> 
          </div>
          <div className="lobbyStatusInfo">
          <p className="lobbyStatusTitle"><i className="fa-solid fa-clock"></i>Status: started</p> 
          </div>
          </div>
          <div className="joinLobbyButtonContainer">
            <p className="joinLobbyButton">Join<i className="fa-solid fa-arrow-right-long fa-2xl"></i></p>
          </div>
      </div>
      <div className="joinLobby container-border">
      <div className="default-container"></div>
      <div className="lobbyProfilePicMap"> </div>
      <div className="ContainerInfo">
        <p className="lobbyTitleMap">
            Pedro's Lobby
          </p>
          <div className="lobbyAreaInfo">
          <p className="lobbyAreaTitle"> <i className="fas fa-map-marker-alt"></i>Area 51</p> 
          </div>
          <div className="lobbyStatusInfo">
          <p className="lobbyStatusTitle"><i className="fa-solid fa-clock"></i>Status: started</p> 
          </div>
          <div className="joinLobbyButtonContainer">
            <p className="joinLobbyButton">Join<i className="fa-solid fa-arrow-right-long fa-2xl"></i></p>
          </div>
          </div>
      </div>
      <div className="joinLobby container-border">
      <div className="default-container"></div>
      <div className="lobbyProfilePicMap"> </div>
      <div className="ContainerInfo">
        <p className="lobbyTitleMap">
            Pedro's Lobby
          </p>
          <div className="lobbyAreaInfo">
          <p className="lobbyAreaTitle"> <i className="fas fa-map-marker-alt"></i>Area 51</p> 
          </div>
          <div className="lobbyStatusInfo">
          <p className="lobbyStatusTitle"><i className="fa-solid fa-clock"></i>Status: started</p> 
          </div>
          <div className="joinLobbyButtonContainer">
            <p className="joinLobbyButton">Join<i className="fa-solid fa-arrow-right-long fa-2xl"></i></p>
          </div>
          </div>
      </div>
    </div>
  </div>
  );
}