import { useSelector, useDispatch } from "react-redux";
import "./perfil.css";
import Artist from "../components/Artist";
import { useState } from "react";
import axios from "axios";

const Perfil = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [artist, setArtist] = useState(null);
  const [searchArtist, setSearchArtist] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const handleSearchArtist = async () => {
    try {
      const { data } = await axios.get(
        `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${searchArtist}`,
      );
      if (data.artists === null) {
        setShowAlert(true);
        setArtist(null);
      } else {
        setShowAlert(false);
        setArtist(data.artists[0]);
        dispatch({
          type: "ADD_SEARCH_HISTORY_ITEM",
          payload: {
            idArtist: data.artists[0].idArtist,
            strArtist: data.artists[0].strArtist,
            strArtistThumb: data.artists[0].strArtistThumb,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-perfil">
      <h1>{`Usuario: ${state.name}`}</h1>
      <h2>Mis artistas</h2>
      <div>
        {state.artists
          ? state.artists.map((item) => {
              return (
                <div className="artist-perfil">
                  <div className="d-flex">
                    <img src={item.strArtistThumb} alt={item.strArtist} />
                    <p>{item.strArtist}</p>
                  </div>
                  <button
                    className="far fa-trash-alt delete-item"
                    onClick={() => {
                      dispatch({ type: "REMOVE_ARTIST", payload: item });
                    }}
                  ></button>
                </div>
              );
            })
          : null}
      </div>
      <div className="busq">
        <div className="searchBar">
          <input
            id="busqueda"
            type="text"
            placeholder="Añade mas artistas"
            className="rounded"
            value={searchArtist}
            onChange={(ev) => {
              setSearchArtist(ev.target.value);
            }}
          />
          <button
            className="fas fa-search rounded"
            onClick={() => {
              handleSearchArtist();
              setSearchArtist("");
            }}
          ></button>
        </div>
        <div className={`alert ${showAlert ? "d-block" : "d-none"}`}>
          Lo sentimos el artista que buscas no ha sido encontrado, por favor ingrese otro.
        </div>
        <div>
          {artist ? (
            <>
              <h2>Resultado de busqueda</h2>
              <div className="d-flex">
                <Artist item={artist} />{" "}
                <button
                  className="fas fa-plus addArtistSearch"
                  onClick={() => {
                    dispatch({
                      type: "ADD_ARTIST",
                      payload: {
                        idArtist: artist.idArtist,
                        strArtist: artist.strArtist,
                        strArtistThumb: artist.strArtistThumb,
                      },
                    });
                  }}
                ></button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Perfil;
