//TODO: change to read from env variables
const ALCHEMY_KEY =
  process.env.NEXT_PUBLIC_ANALYTICS_ID ?? "9v-M_TXjoUID7kjnUcMR9zo7HXNRZRq4";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://devapi.ascendant.fun";

const MAINNET = "mainnet";
const TESTNET = "testnet";

const CONTRACT_NETWORK = process.env.NEXT_PUBLIC_CONTRACT_NETWORK
  ? process.env.NEXT_PUBLIC_CONTRACT_NETWORK
  : TESTNET;

let SBT_CONTRACT_ADDRESS =
  CONTRACT_NETWORK === MAINNET
    ? "0xbEea2c08807782579D736Ced38fca2657D0077aB"
    : "0x25386b30b72d1ae1ee305f018add41e99cbf50fa";

export {
  ALCHEMY_KEY,
  API_BASE_URL,
  SBT_CONTRACT_ADDRESS,
  MAINNET,
  TESTNET,
  CONTRACT_NETWORK,
};
