import React, { useState, useEffect } from "react";
import { getLobbies, joinLobby } from "../../services/lobbyService";
import Loading from "../Loading"
import LobbyContainer from "./LobbyContainer";
import "../../stylesheets/lobby/JoinSkateLobby.css";
import CityMap from "./CityMap";

function JoinSkateLobby() {
  const [mapmode, setMapmode] = useState("Join");
  const [lobbies, setLobbies] = useState([]);
  const [loaded, setLoaded] = useState(false)

  const loadLobbies = async () => {
    setLobbies(await getLobbies());
    setLoaded(true)
  };

  useEffect(() => {
    loadLobbies();
  }, []);

  const handleMapmode = (mapmode) => {
    setMapmode(mapmode);
  };

  const loadMapmode = () => {
    if (mapmode === "Join") {
      return (
        <div className="join-skate-lobby">
        <p
        className="back-button"
        onClick={() => {
          window.history.back()
        }}>
        <i className="fa-solid fa-angle-left"></i>
      </p>
          <button
            className="cityMapButtonContainer container-border"
            onClick={() => {
              handleMapmode("Map");
            }}
          >
            <p className="cityMapTitle">
              See City Map{" "}
              <i className="fa-solid fa-arrow-right-long fa-lg"></i>
            </p>
          </button>
          <div id="public-skate-lobbies">
          {loaded && lobbies.length === 0 ? <p className="no-public-lobbies">Ooops looks like there are no available lobbies at this moment</p> : ''}
            {loaded ? lobbies.map((lobby) => (
              <LobbyContainer lobby={lobby} />
            )) : <Loading/>}
          </div>
        </div>
      );
    } else if (mapmode === "Map") {
      return <CityMap back={() => {setMapmode("Join")}}/>;
    }
  };

  return <>{loadMapmode()}</>;
}

export default JoinSkateLobby;
