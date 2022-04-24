import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, PublicKey, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js'
import React, { useCallback, FC } from 'react'
import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'
import { getOrCreateAssociatedTokenAccount } from './getOrCreateAssociatedTokenAccount'
import { createTransferInstruction } from './createTransferInstructions'

const SendTransaction: FC = ( ) => {
    const { connection } = useConnection()
    const { publicKey, signTransaction, sendTransaction } = useWallet()
    const DEMO_WALLET = new Uint8Array([255,115,252,21,251,141,134,140,68,201,254,188,213,17,121,153,255,114,238,144,131,17,52,59,63,205,169,164,27,253,201,242,89,135,193,246,44,216,43,52,246,43,43,45,186,47,130,204,145,255,246,188,25,187,153,187,137,219,247,232,145,161,9,103])
    const fromWallet = Keypair.fromSecretKey(DEMO_WALLET);
    const onSendSPLTransaction = useCallback(
        async () => {
            try {
                if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
                const toPublicKey = new PublicKey(publicKey)
                const mint = new PublicKey('7c4vgGd2xa8rc2VAFxHsUZvsPBsTmWvmUudpq59SrpTf')
                const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    fromWallet.publicKey,
                    mint,
                    fromWallet.publicKey,
                    signTransaction
                )
                
                const toTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mint,
                    toPublicKey,
                    signTransaction
                )
                const transaction = new Transaction().add(
                    createTransferInstruction(
                        fromTokenAccount.address, // source
                        toTokenAccount.address, // dest
                        publicKey,
                        10,
                        [],
                        TOKEN_PROGRAM_ID
                    )
                )

                const blockHash = await connection.getLatestBlockhash()
                transaction.feePayer = await publicKey
                transaction.recentBlockhash = await blockHash.blockhash
                const signed = await signTransaction(transaction)

                await connection.sendRawTransaction(signed.serialize())

            
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
        
            }
        },
        [publicKey, sendTransaction, connection]
    )

    return (
        <button onClick={onSendSPLTransaction} disabled={!publicKey}>
          Send 1 lamport to a random address but spl another one xd!
        </button>
      );
}

export default SendTransaction