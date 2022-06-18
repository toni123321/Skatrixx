import React, { useState, useEffect } from "react";
import { getLobbies, joinLobby } from "../../services/lobbyService";
import LobbyContainer from "./LobbyContainer";
import "../../stylesheets/lobby/JoinSkateLobby.css";
import CityMap from "./CityMap";

function JoinSkateLobby() {
  const [mapmode, setMapmode] = useState("Join");
  const [lobbies, setLobbies] = useState([]);

  const loadLobbies = async () => {
    setLobbies(await getLobbies());
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
            {lobbies.map((lobby) => (
              <LobbyContainer lobby={lobby} />
            ))}
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
