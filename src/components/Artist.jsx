import "./artist.css";

const Artist = ({ item }) => {
  return (
    <a href={`/artista/${item.idArtist}`} className="bv-art">
      <img className="artist-img"
        src={
          item.strArtistThumb
            ? item.strArtistThumb
            : "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
        }
        alt={item.strArtist}
      />
      <p>{item.strArtist}</p>
    </a>
  );
};
export default Artist;
