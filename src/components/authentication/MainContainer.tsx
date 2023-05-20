import React from 'react'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import contractABI from '../store/abi.json'
import { JsonRpcProvider } from "ethers";


const priceMonitorAddress = "0x7D5aD9B8A626d3f854F77eD7d543c90dE6D4B147"
const SmartContractLocalIP = "http://127.0.0.1:8545"

export default function MainContainer(props) {

  async function fetchContract() {
    if(typeof window.ethereum != 'undefined'){

      //By using the provider object we’re ready to retrieve a reference to the SC
      //on the blockchain by creating a new ethers.Contract object.
      // const provider = new BrowserProvider(window.ethereum)

      const provider = new JsonRpcProvider(SmartContractLocalIP);
      const contract = new ethers.Contract(priceMonitorAddress, contractABI, provider)
      console.log
      try{
        const data = await contract.getProduct(0)
        console.log(data)
      }catch(err){
        console.log("Error: ", err)
      }
    }
  }

  async function addProduct(name:string, brand:string, description:string) {
    if (name != '' || brand != '' || description !='') return;
    if(typeof window.ethereum != 'undefined'){

      //to retrieve the user account from the MetaMask client in the browser.
      // await requestAccount()

      const provider = new JsonRpcProvider(SmartContractLocalIP);

      //A Signer is needed because we’re using a method which is writing to the smart contract 
      const signer = provider.getSigner()
      const contract = new ethers.Contract(priceMonitorAddress, contractABI, signer)

      //Create the transaction
      const transaction = await contract.addProduct(name, brand, description)

      //Execute the transaction
      await transaction.wait()
    }
  }

  useEffect(() => {
    fetchContract()
    addProduct("Salchicha","Zenu","Salchica rica hahah")
    return () => {}
  }, [])
  

  return(
    <main>
      {props.children}
    </main>
  )
    
}
