import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { GoogleLogin } from "@react-oauth/google";
import { VENDOR_KEY } from "../../Utils";
import { GoogleLogin } from '@react-oauth/google';
import { NFT_ADDRESS, VENDOR_KEY } from "../../Utils";

import { NavLink, Link } from "react-router-dom";
import ConnectWallet from "../Common/ConnectWallet/ConnectWallet";
import axios from "axios";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "My Account",
    url: "/my-account",
  },
];

const Header = () => {
  const [connectedWallet, setConnectedWallet] = useState("");
  const headerRef = useRef(null);

  const menuRef = useRef(null);

  const responseMessage = async (response) => {
    console.log(response.credential);
    let { data } = await axios.post(
      "https://3p-bff.oktostage.com/api/v1/authenticate",
      {
        id_token: response.credential,
      },
      {
        headers: {
          "x-api-key": VENDOR_KEY,
        },
      }
    );
    console.log("data : ", data);
    const token = data.data.token;
    // user signup flow
    if (token) {
      console.log("token true");
      const { data1 } = await axios.post(
        `https://3p-bff.oktostage.com/api/v1/set_pin`,
        {
          id_token: response.credential,
          token: token,
          relogin_pin: "123456",
          purpose: "set_pin",
        },
        {
          headers: {
            "x-api-key": VENDOR_KEY,
          },
        }
      );
      const { auth_token, refresh_auth_token, device_token } = data1.data;
      localStorage.setItem("okto_auth_token", auth_token);
      localStorage.setItem("okto_refresh_auth_token", refresh_auth_token);
      localStorage.setItem("okto_device_token", device_token);
    } else {
      const { auth_token, refresh_auth_token, device_token } = data.data;
      localStorage.setItem("okto_auth_token", auth_token);
      localStorage.setItem("okto_refresh_auth_token", refresh_auth_token);
      localStorage.setItem("okto_device_token", device_token);
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const createWallet = async () => {
    let token = localStorage.getItem("okto_auth_token");
    if (token) {
      const { data } = await axios.post(
        `https://3p-bff.oktostage.com/api/v1/wallet`,
        {},
        {
          headers: {
            "x-api-key": VENDOR_KEY,
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { wallets } = data.data;
      console.log("wallet ", wallets);
      setConnectedWallet(wallets[0].address);
    } else {
      console.log("Error in ");
    }
  };

  const performTX = async() => {
    let token = localStorage.getItem('okto_auth_token');
    if(token && connectedWallet) {
      const { data } = await axios.post(
        `https://3p-bff.oktostage.com/api/v1/rawtransaction/execute`,
        {
          network_name: "POLYGON_TESTNET",
          transaction: {
            from: connectedWallet,
            to: NFT_ADDRESS,
            data: "",
            value: 100000,
          }, // raw transaction
        },
        {
          headers: {
            "x-api-key": VENDOR_KEY,
            authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } 

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            {/* <h2 className=" d-flex gap-2 align-items-center ">
              <span>n
                <i class="ri-fire-fill"></i>
              </span>
              NFTs
            </h2> */}
            <img
              src="https://copper-written-jellyfish-195.mypinata.cloud/ipfs/QmVjSZJcAwLeYs65Ny4NsGWjMxVfKPtkqDURQEnRrB2VHL"
              alt="gane logo"
              className="logo"
            ></img>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <button className="btn d-flex gap-2 align-items-center">
              <span>
                <i class="ri-wallet-line"></i>
              </span>
              {/* <Link to="/wallet">Connect Wallet</Link> */}
              <ConnectWallet />
            </button>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            {connectedWallet ? (
              connectedWallet
            ) : (
              <button
                onClick={createWallet}
                className="btn d-flex gap-2 align-items-center wallet-button"
              >
                <p className=" create-wallet">Create Wallet</p>
              </button>
            )}

            <button onclick={performTX} > TX </button>

            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
