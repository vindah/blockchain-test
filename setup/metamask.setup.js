import 'dotenv/config';
import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask } from '@synthetixio/synpress/playwright';

const SEED_PHRASE = process.env.METAMASK_SEED_PHRASE;
const PASSWORD = process.env.METAMASK_PASSWORD;

if (!SEED_PHRASE || !PASSWORD) {
  throw new Error(
    'METAMASK_SEED_PHRASE and METAMASK_PASSWORD must be set in your .env file'
  );
}

// This runs once when you build the wallet cache.
const walletSetup = defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD);
  await metamask.importWallet(SEED_PHRASE);

});

export default walletSetup;
export const walletPassword = PASSWORD;
