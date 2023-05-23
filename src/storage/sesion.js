import { atom } from 'nanostores';

export const addressWallet = atom("");
export const idProductoSelected = atom(-1);

export function setAddressWallet(address){
  addressWallet.set(address);
  console.log("new address -> ", address);
}

export function setProductSelected(id){
  idProductoSelected.set(id)
  console.log("ID producto seleccionado:"+id)
}