// src/thirdweb.jsx
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export const chain = defineChain(11155111); // e.g., Sepolia testnet

export const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: import.meta.env.VITE_FACTORY_ADDRESS,
  });
