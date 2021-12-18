import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./artist-albums.css";

const ArtistAlbums = ({ artist }) => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const getAlbums = async () => {
      try {
        const { data } = await axios.get(
          `https://theaudiodb.com/api/v1/json/2/album.php?i=${artist.idArtist}`,
        );
        console.log(data.album);
        console.log("hola");
        setAlbums(data.album);
        console.log(albums);
      } catch (error) {
        console.log(error);
      }
    };
    getAlbums();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 701 },
      items: 3,
    },
    small: {
      breakpoint: { max: 700, min: 465 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <p className="artist-name">{artist.strArtist}</p>
      <div className="container">
        <a href={`/artista/${artist.idArtist}`}>
          <img className="img-artist-album" src={artist.strArtistThumb} alt={artist.strArtist} />
        </a>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={false}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet","small", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {albums
            ? albums.map((item) => {
                return (
                  <a
                    className="img-album-container"
                    key={item.idAlbum}
                    href={`/album/${item.idAlbum}`}
                  >
                    <img
                      className="img-album"
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
        </Carousel>
      </div>
    </div>
  );
};
export default ArtistAlbums;
