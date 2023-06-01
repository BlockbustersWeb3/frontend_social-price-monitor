import React from 'react'
import { Wallet, ethers } from 'ethers'
import { addressWallet, setAddressWallet } from '../sesion.js'

export default function NavbarDashboard(props) {

  function showAddress(){
    console.log("Address:", addressWallet.get())
  }

  async function disconnectWallet(){
    setAddressWallet("")
    window.location.href = "/";
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
              <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href='/home/products'>
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" onClick={showAddress}>
                Username
              </a>
            </li>
            <li className="nav-item">
              <button className="nav-link text-dark font-weight-bold d-flex align-items-center me-2"
                aria-current="page"
                id="btn-connection-wallet"
                onClick={disconnectWallet}>
                  Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}