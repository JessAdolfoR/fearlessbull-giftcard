import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Navbar.module.css";
import { fillCart } from "../redux/cart.slice";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };
  useEffect(() => {
    if (localStorage.getItem("items")) {
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach((elem) => {
        dispatch(fillCart(elem));
      });
    }
  }, []);
  return (
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>GamesKart</h6>
      <ul className={styles.links}>
        <div className={styles.walletButtons}>
          <WalletMultiButton />
          {/* <WalletDisconnectButton /> */}
        </div>
        <li className={styles.navlink}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/shop">Shop</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/cart">
            <p className={styles.pLink}>Cart ({getItemsCount()})</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
