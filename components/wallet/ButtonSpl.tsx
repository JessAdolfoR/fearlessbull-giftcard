import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as splToken from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import { useDispatch } from "react-redux";
import { showSuccess } from "../../redux/toast.slice";
import { clearCart } from "../../redux/cart.slice";

import React, { FC, useCallback } from "react";

export const SendSPLTokenToAddress: FC<any> = ({ amount, idProduct }) => {
  const TOKEN_PUBLIC_KEY = "7c4vgGd2xa8rc2VAFxHsUZvsPBsTmWvmUudpq59SrpTf";
  const RECEIVER_WALLET_PUBLIC_KEY =
    "72VMHx1Lu8tDtCmxU9w1DNwAm9Pb8eFDrTwK4xDySULe";
  const AMOUNT_TO_SEND = amount.toFixed(2);
  console.log(AMOUNT_TO_SEND);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const dispatch = useDispatch();
  const onClick = useCallback(async () => {
    const senderPublicKey = new web3.PublicKey(publicKey!.toBase58());
    const tokenPublicKey = new web3.PublicKey(TOKEN_PUBLIC_KEY);
    const receiverPublicKey = new web3.PublicKey(RECEIVER_WALLET_PUBLIC_KEY);
    // const balance = await connection.getBalance(senderKeypair.publicKey);
    // console.log(`Sender wallet has ${balance / web3.LAMPORTS_PER_SOL} SOL`);

    const senderTokenAddress = await splToken.getAssociatedTokenAddress(
      tokenPublicKey,
      senderPublicKey,
      false,
      splToken.TOKEN_PROGRAM_ID,
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );
    const receiverTokenAddress = await splToken.getAssociatedTokenAddress(
      tokenPublicKey,
      receiverPublicKey,
      false,
      splToken.TOKEN_PROGRAM_ID,
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const receiverTokenAccount = await connection.getAccountInfo(
      receiverTokenAddress
    );

    const transaction = new web3.Transaction();
    if (receiverTokenAccount === null) {
      console.log(
        "Receiver wallet does NOT have an account for this token... creating it."
      );
      const createATAInstruction =
        splToken.createAssociatedTokenAccountInstruction(
          senderPublicKey,
          receiverTokenAddress,
          receiverPublicKey,
          tokenPublicKey,
          splToken.TOKEN_PROGRAM_ID,
          splToken.ASSOCIATED_TOKEN_PROGRAM_ID
        );
      transaction.add(createATAInstruction);
    }

    const amountToSend = AMOUNT_TO_SEND * web3.LAMPORTS_PER_SOL;
    const transferInstruction = splToken.createTransferInstruction(
      senderTokenAddress,
      receiverTokenAddress,
      senderPublicKey,
      amountToSend
    );
    transaction.add(transferInstruction);

    // process.stdout.write(`---Transaction info---
    // Sender Wallet: ${senderPublicKey.toBase58()}
    // Receiver Wallet: ${receiverPublicKey.toBase58()}
    // Receiver Token Account: ${receiverTokenAddress.toBase58()}
    // Token: ${tokenPublicKey.toBase58()}
    // Amount: ${amountToSend / web3.LAMPORTS_PER_SOL}
    // Status: sending...`);

    const sig = await sendTransaction(transaction, connection);
    const result = await connection.confirmTransaction(sig);
    dispatch(showSuccess());
    dispatch(clearCart(idProduct));
  }, [publicKey, sendTransaction, connection]);

  return (
    <div>
      <button className="button-spl" onClick={onClick} disabled={!publicKey}>
        Buy Now
      </button>
    </div>
  );
};
