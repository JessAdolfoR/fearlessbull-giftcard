import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice';
import styles from '../styles/CartPage.module.css';
import { SendSPLTokenToAddress } from '../components/wallet/ButtonSpl';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
    const [coin, setCoin] = useState({})
    const router = useRouter();
    const getCoin=async()=>{
      let response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
      const coins = await response.json();
      setCoin(coins)
    return coins;
    }
    useEffect(() => {
      getCoin()
  },[])
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {cart.map((item) => (
            <div className={styles.body}>
              <div className={styles.image}>
                <Image src={item.image} height="90" width="65" />
              </div>
              <p>{item.product}</p>
              <p>$ {item.price}</p>
              <p>{item.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  x
                </button>
              </div>
              <p>$ {item.quantity * item.price}</p>
            </div>
          ))}
          <h2>Grand Total: $ {getTotalPrice()}/ Total Token:{getTotalPrice() / coin.solana?.usd} </h2>
          Today's price of the coin {coin.solana?.usd} 
          <SendSPLTokenToAddress/>
        </>
      )}
    </div>
  );
};

export default CartPage;
