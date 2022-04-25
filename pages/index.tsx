import type { NextPage } from "next";
import CategoryCard from "../components/CategoryCard";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.small}>
        <CategoryCard image="https://imgur.com/uKQqsuA.png" name="Xbox" />
        <CategoryCard image="https://imgur.com/3Y1DLYC.png" name="PS5" />
        <CategoryCard image="https://imgur.com/Dm212HS.png" name="Switch" />
      </div>
      <div className={styles.large}>
        <CategoryCard image="https://imgur.com/qb6IW1f.png" name="PC" />
        <CategoryCard
          image="https://imgur.com/HsUfuRU.png"
          name="Accessories"
        />
      </div>
      <div className={styles.walletButtons}>
        {/* <WalletMultiButton />
                    <WalletDisconnectButton /> */}
        {/* <SendOneLamportToRandomAddress/> */}
        {/* <SendSPLTokenToAddress/> */}
        {/* <SendTransaction/> */}
      </div>
    </main>
  );
};

export default Home;
