import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart.slice";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles}>
      <Link href={`/product/${product.id}`}>
        <Image
          className={styles.imageLink}
          src={product.image}
          height={300}
          width={220}
        />
      </Link>
      <h4 className={styles.title}>{product.product}</h4>
      <h5 className={styles.category}>{product.category}</h5>
      <p>$ 1 - $2000</p>
      {/* <button
        onClick={() => dispatch(addToCart(product))}
        className={styles.button}
      >
        Add to Cart
      </button> */}
      <Link href={`/product/${product.id}`}>
        <button className={styles.button}>View More</button>
      </Link>
    </div>
  );
};

export default ProductCard;
