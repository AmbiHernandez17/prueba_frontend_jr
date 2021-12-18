import { useState } from "react";
import "./bienvenida.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import Artist from "../components/Artist";

const Bienvenida = () => {
  const [userName, setuserName] = useState(null);
  const [artist, setArtist] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [artists, setArtists] = useState([]);
  const dispatch = useDispatch()
  const handleAddArtist = async () => {
    try {
      const { data } = await axios.get(
        `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`,
      );
      if (data.artists === null) {
        setShowAlert(true);
      } else {
          setShowAlert(false)
        const { idArtist, strArtist, strArtistThumb } = data.artists[0];
        const obj = { idArtist, strArtist, strArtistThumb };
        setArtists([...artists, obj]);
      }
    } catch (error) {console.log(error)}
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
              handleAddArtist();
            }}
          >
            Añadir
          </button>
        </div>
        <div className={`alert ${showAlert ? "d-block" : "d-none"}`}>
          Lo sentimos el artista que buscas no ha sido encontrado, por favor ingrese otro.
        </div>
        <div>
          {artists ? artists.map((item) => {
            return (
            <Artist item= {item}/>
            );
          }):null}
        </div>
        <div className="btn-right">
            <a href="/inicio">
                <button className="fas fa-arrow-right" onClick={()=>{
                    dispatch({type:"ADD_NAME", payload:userName})
                    dispatch({type:"BULKADD_ARTIST", payload:artists})
                }}></button>
            </a>
        </div>
      </div>
    </div>
  );
};
export default Bienvenida;
