import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import { addressWallet, setAddressWallet } from '../sesion.js'

const Navbar = (props) => {

  // const addressWallet = useStore(addressWallet)

  /**
   * Request access to the User's META MASK WALLET
   */
  async function requestAccount() {
    //Check if the Meta Mask Extensions exists
    if(window.ethereum){
      try{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        
        // setAddressWallet(accounts[0])
        setAddressWallet(accounts[0])
        console.log("new address...", accounts[0])
        return true;
      }catch(e){
        console.log(e)
      }
      return false;
    }else{
      console.log("Meta Mask not detected")
      return false;
    }
  }

  function showAddress(){
    console.log("wallet ", addressWallet.get())
  } 

  async function connectWallet(){
    if(addressWallet.get() != "" && typeof(addressWallet.get()) != 'undefined'){
      console.log("Redirecting to the products home");
      window.location.href = "/home/products";
    }else{
      if(typeof window.ethereum !== 'undefined'){
      
        let response = await requestAccount();
        //Provider to interact with the smart contract
        //const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const web3Provider = new ethers.BrowserProvider(window.ethereum);
        if(response){
          console.log(response)
          window.location.href = "/home/products";
        }else{
          console.log("Problemas al establecer la conexion con la wallet")
        }
        
      }
    }
  }  

  return (
    <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0">
      <div className="container px-1">
        <a className="navbar-brand font-weight-bolder ms-lg-0 " href="#">Blockbusters</a>
        <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon mt-2">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navigation">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="#">
                How it works
              </a>
            </li>
            <li className="nav-item">
              <a onClick={showAddress} className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="#">
                Team
              </a>
            </li>
            <li className="nav-item">
              <button className="nav-link text-dark font-weight-bold d-flex align-items-center me-2"
                aria-current="page"
                id="btn-connection-wallet"
                onClick={connectWallet}>
                  {addressWallet.get() != "" && typeof(addressWallet.get()) != 'undefined'? "Go to products" : "Connect Wallet"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

// const Navbar = () => {  

//   return (
//     <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0">
//       <div className="container px-1">
//         <a className="navbar-brand font-weight-bolder ms-lg-0 " href="#">Blockbusters</a>
//         <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon mt-2">
//             <span className="navbar-toggler-bar bar1"></span>
//             <span className="navbar-toggler-bar bar2"></span>
//             <span className="navbar-toggler-bar bar3"></span>
//           </span>
//         </button>
//         <div className="collapse navbar-collapse" id="navigation">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="/astro-ecommerce/">
//                 How it works
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="#">
//                 Team
//               </a>
//             </li>
//             <li className="nav-item">
//               <button className="nav-link text-dark font-weight-bold d-flex align-items-center me-2"
//                 aria-current="page"
//                 id="btn-connection-wallet">
//                   Connect Wallet
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

export default Navbar;
