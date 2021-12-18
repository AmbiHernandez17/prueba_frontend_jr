import "./artist.css"

const Artist = ({item})=>{
    return(
        <div className="bv-art">
        <img src={item.strArtistThumb} alt={item.strArtist} />
        <p>{item.strArtist}</p>
      </div>
    )
}
export default Artist;