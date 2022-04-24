import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID  } from '@solana/spl-token';
import React, { FC, useCallback } from 'react';

export const SendSPLTokenToAddress: FC = (amount) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const DEMO_WALLET = new Uint8Array([255,115,252,21,251,141,134,140,68,201,254,188,213,17,121,153,255,114,238,144,131,17,52,59,63,205,169,164,27,253,201,242,89,135,193,246,44,216,43,52,246,43,43,45,186,47,130,204,145,255,246,188,25,187,153,187,137,219,247,232,145,161,9,103])

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const fromWallet = Keypair.fromSecretKey(DEMO_WALLET);
    const myMint = new PublicKey("7c4vgGd2xa8rc2VAFxHsUZvsPBsTmWvmUudpq59SrpTf")
    const myToken = new Token(
      connection,
      myMint,
      TOKEN_PROGRAM_ID,
      fromWallet,
    );
    const fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      fromWallet.publicKey
    )
    const toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      publicKey
    )
    const transaction = new Transaction().add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        1,
      )
    );
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
    );
    // const signature = await sendTransaction(transaction, connection);
     console.log("SIGNATURE", signature);
    // await connection.confirmTransaction(signature, 'processed');
  }, [publicKey, sendTransaction, connection]);

  return (
    <button className='button-spl' onClick={onClick} disabled={!publicKey}>
      Send Transition
    </button>
  );
};
