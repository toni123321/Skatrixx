import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../../stylesheets/Location/CityMap.css"
import { getLobbies } from "../../services/lobbyService";
import CityMapLobby from "./CityMapLobby";
import Loading from "../Loading";


export default function CityMap(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });

  if (!isLoaded) return <Loading/>;
  return <Map back={props.back}/>;
}

function Map(props) {
  const center = useMemo(() => ({ lat: 51.4381, lng: 5.4752 }), []);
  const [lobbies, setLobbies] = useState([]);

  const loadLobbies = async () => {
    const lobbies = await getLobbies()
    setLobbies(lobbies.length >= 3 ? lobbies.slice(0, 3) : lobbies);
  };

  useEffect(() => {
    loadLobbies()
  }, [])
  
  return ( 
    <div>
            <p
        className="back-button"
        onClick={() => {
          props.back();
        }}>
        <i className="fa-solid fa-angle-left"></i>
      </p>
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}">
    <Marker position={center} />
  </GoogleMap>
  {lobbies !== [] ?
    <div className="lobbyContainer">
      {lobbies.map((lobby, index) => (
        <CityMapLobby lobby={lobby}/>
      ))}
    </div> : ''}
  </div> 
  );
}