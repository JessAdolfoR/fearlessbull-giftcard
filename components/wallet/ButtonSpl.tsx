import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as splToken from "@solana/spl-token";
import * as web3 from "@solana/web3.js";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const TOKEN_PUBLIC_KEY = "7c4vgGd2xa8rc2VAFxHsUZvsPBsTmWvmUudpq59SrpTf";
const RECEIVER_WALLET_PUBLIC_KEY =
  "72VMHx1Lu8tDtCmxU9w1DNwAm9Pb8eFDrTwK4xDySULe";
const AMOUNT_TO_SEND = 1;

import React, { FC, useCallback } from "react";

export const SendSPLTokenToAddress: FC = (amount) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  console.log(typeof publicKey);
  const DEMO_WALLET = new Uint8Array([
    255, 115, 252, 21, 251, 141, 134, 140, 68, 201, 254, 188, 213, 17, 121, 153,
    255, 114, 238, 144, 131, 17, 52, 59, 63, 205, 169, 164, 27, 253, 201, 242,
    89, 135, 193, 246, 44, 216, 43, 52, 246, 43, 43, 45, 186, 47, 130, 204, 145,
    255, 246, 188, 25, 187, 153, 187, 137, 219, 247, 232, 145, 161, 9, 103,
  ]);
  const onClick = useCallback(async () => {
    // const connection = new web3.Connection(RPC_ENDPOINT, "processed");
    const senderKeypair = web3.Keypair.fromSecretKey(
      Uint8Array.from([
        255, 115, 252, 21, 251, 141, 134, 140, 68, 201, 254, 188, 213, 17, 121,
        153, 255, 114, 238, 144, 131, 17, 52, 59, 63, 205, 169, 164, 27, 253,
        201, 242, 89, 135, 193, 246, 44, 216, 43, 52, 246, 43, 43, 45, 186, 47,
        130, 204, 145, 255, 246, 188, 25, 187, 153, 187, 137, 219, 247, 232,
        145, 161, 9, 103,
      ])
    );
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
    console.log(result);
  }, [publicKey, sendTransaction, connection]);

  return (
    <button className="button-spl" onClick={onClick} disabled={!publicKey}>
      Send Transition
    </button>
  );
};
