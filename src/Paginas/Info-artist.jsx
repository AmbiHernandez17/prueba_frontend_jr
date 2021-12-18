import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "./info-artist.css";

const InfoArtist = () => {
  const [artistInfo, setArtistInfo] = useState(null);
  const params = useParams();
  const [selectLanguage, setSelectLanguage] = useState("Selecciona un idioma");
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const getInfoArtist = async () => {
      try {
        const { data } = await axios.get(
          `https://theaudiodb.com/api/v1/json/2/artist.php?i=${params.idArtista}`,
        );
        setArtistInfo(data.artists[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoArtist();
    const getAlbums = async () => {
        try {
          const { data } = await axios.get(
            `https://theaudiodb.com/api/v1/json/2/album.php?i=${params.idArtista}`,
          );
          setAlbums(data.album);
        } catch (error) {
          console.log(error);
        }
      };
      getAlbums();
  });
  return (
    <div className="info-artist-container">
      <img
        src={
          artistInfo
            ? artistInfo.strArtistWideThumb
              ? artistInfo.strArtistWideThumb
              : artistInfo.strArtistFanart
            : null
        }
        alt=""
        className="img-logo"
      />
      <div >
        <h2>{`Nombre: ${artistInfo ? artistInfo.strArtist : null}`}</h2>
        <h2>{`Año de formacion: ${artistInfo ? artistInfo.intFormedYear : null}`}</h2>
        <h2>{`Pais: ${artistInfo ? artistInfo.strCountry : null}`}</h2>
        <div className="d-flex">
          <h2>Biografia</h2>
          <select
            className="select-lang"
            value={selectLanguage}
            onChange={(ev) => {
              setSelectLanguage(ev.target.value);
            }}
          >
            <option defaultValue disabled>
              Selecciona un idioma
            </option>
            <option value="EN">Ingles</option>
            <option value="ES">Español</option>
            <option value="PT">Portugues</option>
            <option value="IT">Italiano</option>
            <option value="CN">Chino</option>
            <option value="DE">Aleman</option>
            <option value="FR">Frances</option>
          </select>
        </div>
        <p className="p-lang">
          {artistInfo &&
          selectLanguage !== "Selecciona un idioma" &&
          artistInfo[`strBiography${selectLanguage}`]
            ? artistInfo[`strBiography${selectLanguage}`]
            : selectLanguage !== "Selecciona un idioma"
            ? "Lo sentimos, la biografia no esta disponible en el idioma seleccionado."
            : null}
        </p>
      </div>
      <h2>Albums:</h2>
      {albums
            ? albums.map((item) => {
                return (
                  <a
                    className="info-artist-album-container"
                    key={item.idAlbum}
                    href={`/album/${item.idAlbum}`}
                  >
                    <img
                      className="info-artist-img-album"
                      src={
                        item.strAlbumThumb
                          ? item.strAlbumThumb
                          : "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
                      }
                      alt={item.strAlbum}
                    />
                    <div className="over">
                      <p>{item.strAlbum}</p>
                    </div>
                  </a>
                );
              })
            : null}
    </div>
  );
};
export default InfoArtist;
