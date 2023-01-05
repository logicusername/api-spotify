const CardItem = ({trackear,agregarFavoritos,favorito}) => {
    return (
      <div>
         <h1 className="fs-6">{trackear.name}</h1>
         <img className="card-image" src={trackear.album.images[1].url}></img>
         <br></br>
        {favorito.length <= 4 ? (<button className="bg-success text-white letra2" onClick={() => agregarFavoritos(trackear,trackear.id)}>favoritos
         </button>
         ):(
          console.log("sobrepaso")
         )}
         
      </div>
    );
  };
  export default CardItem;
  