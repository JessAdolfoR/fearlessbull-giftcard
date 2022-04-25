import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart.slice";
import styles from "../styles/SingleProduct.module.css";
import Link from "next/link";
import prices from "../dummy/prices.json";
import React, { useState } from "react";
import { SendSPLTokenToAddress } from "./wallet/ButtonSpl";
import { useWallet } from "@solana/wallet-adapter-react";
import { ToastContainer } from "react-nextjs-toast";
const SingleProduct = ({ product, coins }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState("");
  const { publicKey } = useWallet();

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event;
    setEmail(event);
    if (emailRegex.test(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.row}>
        <div className={styles.col4}>
          <Link href={`/product/${product.id}`}>
            <Image src={product.image} height={300} width={220} />
          </Link>
        </div>
        <div className={styles.col4}>
          <h2 className={styles.title}>{product.product}</h2>
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
            <p>Email</p>
            <div>
              <input
                onChange={(e) => validateEmail(e.target.value)}
                className={styles.inputValueEmail}
                name="email"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className={styles.col4}>
          <div className="product-pane">
            <div className="product-seller">
              Sold by: <strong>Fearlessbull</strong>
              <p>
                {" "}
                Price of token today: <strong>${coins.solana?.usd}</strong>
              </p>
            </div>
            <div className="product-price">
              {" "}
              <p>
                Final price $<strong>{value}</strong> <br />
                or <strong>{value / coins.solana?.usd}</strong> tokens
              </p>
            </div>
          </div>
          <div className={styles.containerButton}>
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
            <div>
              {publicKey &&
              value !== 0 &&
              value !== "" &&
              isValid === true &&
              email !== "" ? (
                <SendSPLTokenToAddress
                  idProduct={product.id}
                  amount={value / coins.solana?.usd}
                />
              ) : (
                <p style={{ textAlign: "center" }}>
                  <strong>
                    Connect your wallet and set a <br />
                    price and email to buy now
                  </strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
