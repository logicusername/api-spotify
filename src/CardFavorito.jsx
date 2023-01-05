const CardFavorito = ({arreglo,quitarFavoritos}) => {
    return(
    <div>
        <h1 className="fs-6">{arreglo.name}</h1>
        <img className="card-image" src={arreglo.album.images[1].url}/>
        <br />
        <button className="bg-dark text-white" onClick={() => quitarFavoritos(arreglo,arreglo.id)}>quitar de favoritos</button>
    </div>
)
}
export default CardFavorito;