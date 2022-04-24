import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart.slice";
import styles from "../styles/SingleProduct.module.css";
import Link from "next/link";
import prices from "../dummy/prices.json";
import React, { useState } from "react";
const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col4}>
          <Link href={`/product/${product.id}`}>
            <Image src={product.image} height={300} width={220} />
          </Link>
        </div>
        <div className={styles.col4}>
          <h4 className={styles.title}>{product.product}</h4>
          <h5 className={styles.category}>{product.category}</h5>
          <label className="form-cell-name">
            Value: <strong className="form-current-value">${value}</strong>
          </label>
          <ul className={styles.formCells}>
            {prices.map((item) => (
              <li
                onClick={() => setValue(item.price)}
                key={item.id}
                className={styles.formCell}
                data-active={value == item.price ? "active" : null}
              >
                <div className={styles.formOptionItem}>
                  <strong className="form-option-item-title" title={item.price}>
                    ${item.price}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <p>Custom Value</p>
            <div className={styles.divContainerInput}>
              <label className={styles.spanDollar} htmlFor="price">
                $
              </label>
              <input
                onChange={(e) => setValue(e.target.value)}
                className={styles.inputValue}
                name="price"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className={styles.col4}>
          <div className="product-pane">
            <div className="product-seller">
              Sold by: <strong>Fearlessbull</strong>
            </div>
            <div className="product-price">
              {" "}
              <p>Final price $ {value}</p>
            </div>
          </div>
          <div id="ProductBuy" className="product-buy">
            <div className="nav-row">
              <div className="nav-col">
                <button
                  className={styles.button}
                  onClick={() => {
                    if (value !== 0 && value !== "") {
                      product.price = value;
                      dispatch(addToCart(product));
                    } else {
                      alert("please put or select a price");
                    }
                  }}
                  title="Add Xbox Gift Card $100 US (Email Delivery) to cart"
                >
                  Add to cart <i className="fas fa-caret-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
