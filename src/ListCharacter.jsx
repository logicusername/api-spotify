import CardItem from "./CardItem";

const ListCharacter = ({trackear,agregarFavoritos,favorito}) => {
        return(
            <div>
                <CardItem
                favorito ={favorito} 
                trackear={trackear}
                agregarFavoritos={agregarFavoritos}/>
            </div>
        );
    };
export default ListCharacter;