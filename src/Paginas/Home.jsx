import { useSelector, useDispatch } from "react-redux";
import Artist from "../components/Artist";
import "./home.css";
import ArtistAlbums from "../components/Artist-albums";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Home = () => {
  const state = useSelector((state) => state);
  const history = useHistory()
  const [searchArtist, setSearchArtist] = useState("");
  const [artist, setArtist] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
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
    <>
      <div>
        <h2>Mis artistas</h2>
        <div className="m-art">
          {state.artists
            ? state.artists.map((item) => {
                return <Artist key={item.idArtist} item={item} />;
              })
            : null}
          <p onClick={()=>{history.push("/inicio#busqueda")}} className="fas fa-plus addArtist"></p>
        </div>
        <div className="artistDetails">
          {state.artists
            ? state.artists.map((item) => {
                return <ArtistAlbums key={item.idArtist} artist={item} />;
              })
            : null}
        </div>
      </div>
      <div className="busq">
        <div className="searchBar">
          <input
            id="busqueda"
            type="text"
            placeholder="Busca tus artistas favoritos"
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
                <Artist item={artist} />
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
          <div>
            <h2>Busquedas recientes</h2>
            {state.searchHistory
              ? state.searchHistory.map((item) => {
                  return <ArtistAlbums key={item.idArtist} artist={item} />;
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
