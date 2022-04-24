import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import type { NextPage } from 'next';
import CategoryCard from '../components/CategoryCard';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { SendOneLamportToRandomAddress } from '../components/wallet/ButtonTransition';
import { SendSPLTokenToAddress } from '../components/wallet/ButtonSpl';
import SendTransaction from '../components/wallet/sendTransaction';

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
