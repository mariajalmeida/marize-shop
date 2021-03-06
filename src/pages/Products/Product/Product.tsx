import { useParams } from "react-router";
import { useCommerceCMS } from "../../../contexts/CommerceContext";
import { GiMailShirt } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";
import { MdAvTimer } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Main from "../../../containers/Main/Main";
import style from "./product.module.css";
import { PrimaryIconButton } from "../../../components/Buttons/Buttons";
import RelatedProducts from "../../../components/RelatedProducts/RelatedProducts";
import Accordion, {
    AccordionDetails,
} from "../../../components/Accordion/Accordion";
import { useContentfulCMS } from "../../../contexts/ContentfulContext";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import sizeChart from "../../../assets/sizing-chart.jpg";
import { useContext, useRef, useState } from "react";
import { FavouritesContext } from "../../../contexts/FavouritesContext";
import {
    addToFavourites,
    removeFromFavourites,
} from "../../../utils/FavouritesFunctions";
import { addToCart } from "../../../utils/CartFunctions";

export function ProductDetails({
    showDetailsAccordion,
    product,
    isScroll,
}: {
    showDetailsAccordion?: any;
    product?: any;
    isScroll?: any;
}) {
    const { setCart } = useShoppingBagCMS();

    const { state, dispatch } = useContext(FavouritesContext);

    return (
        <section className={style.productDetails}>
            <img src={product?.image.url} alt={product?.name} />
            <div className={style.wrapper}>
                <div className={style.introduction}>
                    <h2>{product?.name}</h2>
                    <h3>{product?.price.formatted_with_code}</h3>
                </div>
                <div className={style.sizing}>
                    <form>
                        <select
                            name="subject"
                            id="subject"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Pick your size
                            </option>
                            {product?.variant_groups[0].options.map(
                                (size: any, index: any) => (
                                    <option key={index} value={size.id}>
                                        {size.name}
                                    </option>
                                )
                            )}
                        </select>
                    </form>
                    <a href={sizeChart} target="_blank" rel="noreferrer">
                        <RiRuler2Line />
                    </a>
                </div>
                <div className={style.shopping}>
                    <PrimaryIconButton
                        text="Add to shopping bag"
                        onClick={() => addToCart(product, setCart)}
                    />
                    {state.favourites.includes(product) ? (
                        <AiFillHeart
                            onClick={() =>
                                removeFromFavourites(dispatch, product.id)
                            }
                            className={style.shoppingSVG}
                        />
                    ) : (
                        <AiOutlineHeart
                            onClick={() => addToFavourites(dispatch, product)}
                            className={style.shoppingSVG}
                        />
                    )}
                </div>
                <div className={style.details}>
                    {product?.description && (
                        <span onClick={showDetailsAccordion}>
                            <GiMailShirt />
                            Product details
                        </span>
                    )}
                    <span onClick={isScroll}>
                        <MdAvTimer />
                        Delivery and Returns
                    </span>
                </div>
            </div>
        </section>
    );
}

export default function Product() {
    const { productId } = useParams();
    const { products } = useCommerceCMS();
    const { faq } = useContentfulCMS();
    const [showAccordion, setShownAccordion] = useState(false);

    const showDetailsAccordion = () => {
        setShownAccordion(!showAccordion);
    };

    const product = products?.find((prod) => prod.id === productId);

    const scrollToComponent = (ref: any) =>
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: "smooth",
        });
    const ref = useRef(null);
    const isScroll = () => scrollToComponent(ref);

    return (
        <Main>
            <ProductDetails
                showDetailsAccordion={showDetailsAccordion}
                isScroll={isScroll}
                product={product}
            />
            {showAccordion && <AccordionDetails fields={product} />}
            <RelatedProducts relatedProducts={product?.related_products} />
            <div className={style.accordion} ref={ref}>
                <h1>FAQ</h1>
                {faq?.map(({ fields }, index) => (
                    <Accordion key={index} fields={fields} />
                ))}
            </div>
        </Main>
    );
}
