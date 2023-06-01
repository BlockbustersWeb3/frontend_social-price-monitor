import { persistentAtom } from '@nanostores/persistent'

export const addressWallet = persistentAtom("");
export const idProductoSelected = persistentAtom(-1);

export function setAddressWallet(address){
  addressWallet.set(address);
  console.log("new address -> ", address);
}

export function setProductSelected(id){
  idProductoSelected.set(id)
  console.log("ID producto seleccionado:"+id)
}