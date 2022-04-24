import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import React, { FC, useCallback, useEffect } from 'react';

export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    useEffect(() => {
        const fetchBalance = async () =>{
            let response = await connection.getBalance(new PublicKey('HLP6MoPz8MA5XDCVkgf2DjgrnHGuWAVtRhcNyeLR9gHy'))
            console.log(response)
            return response
        }
        fetchBalance()
    },[])
    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('U7Hp2QoQXqGcQrWuhhPBKZQEjVh4nWxQdmEVo6HSkLe'),
                lamports: 100,
            })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send 1 lamport to a random address!
        </button>
    );
};