import { useState, useEffect } from "react";
import "./bienvenida.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Artist from "../components/Artist";

const Bienvenida = () => {
  const [userName, setuserName] = useState(null);
  const [artist, setArtist] = useState(null);
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [artists, setArtists] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  useEffect(() => {
    if (state.artists.length !== 0 ) {
      history.push("/inicio")
    }
  }, [])
  const handleAddArtist = async () => {
    try {
      const { data } = await axios.get(
        `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`,
      );
      if (data.artists === null) {
        setShowAlert(true);
      } else if (artists.length < 3) {
        setShowAlert(false);
        const { idArtist, strArtist, strArtistThumb } = data.artists[0];
        const obj = { idArtist, strArtist, strArtistThumb };
        setArtists([...artists, obj]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg">
      <div className="modal">
        <h3>Bienvenido/a a AudioDB</h3>
        <label htmlFor="userName">Nombre/Usuario</label>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={(ev) => {
            setuserName(ev.target.value);
          }}
        />
        <label htmlFor="artist">Ingrese 3 artistas</label>
        <div>
          <input
            type="text"
            name="artist"
            value={artist}
            onChange={(ev) => {
              setArtist(ev.target.value);
            }}
          />
          <button
            onClick={() => {
              setArtist("")
              handleAddArtist();
            }}
          >
            Añadir
          </button>
        </div>
        <div className={`alert ${showAlert ? "d-block" : "d-none"}`}>
          Lo sentimos el artista que buscas no ha sido encontrado, por favor ingrese otro.
        </div>
        <div className="artists-to-add">
          {artists
            ? artists.map((item) => {
                return <Artist item={item} />;
              })
            : null}
        </div>
        <div className="btn-right">
          <button
            className="fas fa-arrow-right"
            onClick={() => {
              userName && artists.length === 3
                ? dispatch({ type: "ADD_NAME", payload: userName }) &&
                  dispatch({ type: "BULKADD_ARTIST", payload: artists }) &&
                  history.push("/inicio")
                : alert("Hay campos por completar");
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};
export default Bienvenida;
