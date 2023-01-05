import React, { useState } from "react";
import ListCharacter from "./ListCharacter";
import CardFavorito from "./CardFavorito";
import "./styles.css";

function App() {
  const [token, setToken] = useState([]);
  var [activo, setActivo] = useState(false);

  function handleToken() {
    var CLIENT_ID = "ee5b01acc0cc4655b76f3fa6727037c0";
    var CLIENT_SECRET = "9c97c4a39e7b4176913aa05f86caface";

    var authOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authOptions)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token));

    setActivo(true);
  }

  const [characters, setCharacters] = useState([]);
  const [trackear, setTrackear] = useState([]);
  const [artista, setArtista] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const handleInformacion = () => {
    async function fetchData() {
      var accesToken = token;

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${artista}&type=artist`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accesToken,
          },
        }
      );
      const data = await response.json();
      setCharacters(data.artists.items);
    }
    fetchData();
  };
  const albums = () => {
    const artist = characters[0].id;
    async function artista() {
      var accesToken = token;

      console.log(accesToken);
      const response = await fetch(
        "https://api.spotify.com/v1/artists/" +
          artist +
          "/top-tracks?market=US",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accesToken,
          },
        }
      );
      const dato = await response.json();
      setTrackear(dato.tracks);
    }
    artista();
  };
  const agregarFavoritos = (antiguo, trackearId) => {
    setFavoritos([...favoritos, antiguo]);

    setTrackear(
      trackear.filter((favoritonuevo) => favoritonuevo.id !== trackearId)
    );
  };

  const quitarFavoritos = (retrocesoFavorito, favoritoId) => {
    setFavoritos(favoritos.filter((favorito) => favorito.id !== favoritoId));

    setTrackear([...trackear.unshift(retrocesoFavorito)]);
  };

  return (
    <div className=" bg-dark text-white text-center pt-5">
      <div>
        <h1 className="letra2">api spotify</h1>
        <h5 className="letra2">(presiona generar pass antes de buscar)</h5>
        <input
          className="p-1"
          placeholder="buscar"
          onChange={(e) => setArtista(e.target.value)}
        ></input>
        <button
          onClick={handleInformacion}
          className="bg-success text-white letra2"
        >
          buscar
        </button>
        <button onClick={handleToken} className="letra2" disabled={activo}>
          generar pass
        </button>
        {characters === 0 ? (
          <h1 className="letra2">digite artista</h1>
        ) : (
          <div>
            <h1 className="letra2">encontrado</h1>
            <button onClick={albums} className="bg-success text-white letra2">
              Canciones
            </button>
          </div>
        )}
      </div>
      <div className="p-4 d-flex justify-content-between">
        <div className="grid-list">
          {trackear.map((tracker) => {
            return (
              <ListCharacter
                favorito={favoritos}
                trackear={tracker}
                agregarFavoritos={agregarFavoritos}
              />
            );
          })}
        </div>
        <div>
          {favoritos.length > 0 ? (
            <div className="favoritos-box bg-success fs-6">
              <h1 className="fs-5">favoritos</h1>
              <h6>(agregar solo 5 favoritos)</h6>
              {favoritos.map((arreglo) => {
                return (
                  <div>
                    <br />
                    <CardFavorito
                      arreglo={arreglo}
                      quitarFavoritos={quitarFavoritos}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            console.log("no hay favoritos")
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
