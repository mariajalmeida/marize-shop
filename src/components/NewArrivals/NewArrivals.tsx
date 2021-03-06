import { Link } from "react-router-dom";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import style from "./newarrivals.module.css";

const NewArrivals = () => {
    const { products } = useCommerceCMS();
    const reversedArray: any[] = [];
    products?.map((product) => reversedArray.unshift(product));
    const newArrivals = reversedArray?.slice(0, 4);
    return (
        <section className={style.newArrivals}>
            <h1>New Arrivals</h1>
            <div className={style.articles}>
                {newArrivals?.map((article) => (
                    <div key={article.id}>
                        <Link to={`/products/${article.id}`}>
                            <img src={article.image.url} alt={article.name} />
                        </Link>
                        <h2>{article.name}</h2>
                        <span>{article.price.formatted_with_code}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
