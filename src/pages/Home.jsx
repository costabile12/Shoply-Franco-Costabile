
import {Carrusel} from "../components/Carrusel"
import { Gallery } from '../components/Gallery';
import { VideoBanner } from '../components/VideoBanner';


export const Home = ({products}) => {

    

    return(
    <div>
        <Carrusel />
        <VideoBanner />
        <h1 className="ms-5 mt-3" id="allProducts">Products</h1>
        <Gallery products={products} />
    </div>

    )
}