import { atom } from 'nanostores';

export const addressWallet = atom("");

export function setAddressWallet(address){
  addressWallet.set(address);
  console.log("new address -> ", address);
}