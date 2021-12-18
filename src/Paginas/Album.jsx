import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./album.css";

const Album = () => {
  const [songs, setSongs] = useState([]);
  const params = useParams();
  const [album, setAlbum] = useState(null);
  useEffect(() => {
    const getAlbum = async () => {
      try {
        const { data } = await axios.get(
          `https://theaudiodb.com/api/v1/json/2/album.php?m=${params.idAlbum}`,
        );
        setAlbum(data.album[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getAlbum();
    const getSongs = async () => {
      try {
        const { data } = await axios.get(
          `https://theaudiodb.com/api/v1/json/2/track.php?m=${params.idAlbum}`,
        );
        setSongs(data.track);
      } catch (error) {
        console.log(error);
      }
    };
    getSongs();
  }, []);
  return (
    <div>
      <div className="container-album">
        <div className="container-header">
          <img className="img-album-songs" src={`${album ? album.strAlbumThumb : null}`} alt="" />
          <div className="container-alb-name">
            <h3>ALBUM: </h3>
            <p className="p-album-name">{`${album ? album.strAlbum : null}`}</p>
            <p className="p-artist-name">{`${album ? album.strArtist : null}`}</p>
          </div>
        </div>
        <div className="container-songs">
          {songs.length !== 0
            ? songs.map((item) => {
                return (
                  <div className="songs">
                    <div className="track-name">
                      <p className="name-track">{item.strTrack}</p>
                      <p className="name-album-artist">{item.strArtist}</p>
                    </div>
                    <p>
                      {new Date(parseInt(item.intDuration)).getMinutes() +
                        ":" +
                        new Date(parseInt(item.intDuration)).getSeconds()}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Album;
