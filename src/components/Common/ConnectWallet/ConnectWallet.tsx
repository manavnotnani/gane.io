import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

// import "./index.scss";
import Spinner from "react-bootstrap/Spinner";
import {
  connectmetamask,
  disconnectWallet,
} from "../../../Redux/Actions/user.action";
import Commonbtn from "../Commonbutton/Commonbtn";
import style from "./ConnectWallet.module.scss";
import { WalletIcon } from "../../../assets/Icons/Svg_icons";
import React from "react";
import { custmizeAddress } from "../../../Services/common.service";

/**CONNECT WALLET MODAL */
const ConnectWallet = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: Dispatch<any> = useDispatch();

  /**DECLARE VARIABLES */
  const [show, setShow] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any>({});

  /**GET STATES FROM STORE */
  const walletAddress = useSelector((state: any) => state?.user?.walletAddress);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(false);
  }, [walletAddress]);

  useEffect(() => {
    setConnectionStatus({});
  }, [show]);

  const connectToWallet = async (wallet) => {
    setConnectionStatus({ wallet, status: "pending" });

    try {
      if (wallet === "MetaMasK") {
        let res = await dispatch(connectmetamask());
        
        if (!res) setConnectionStatus({ wallet, status: "error" });

        // setTimeout(async () => {
        //   try {
        //     let res: any = await dispatch(connectmetamask());

        //     setConnectionStatus({ wallet, status: "account" });
        //     if (res) {
        //       handleClose();
        //     }
        //     handleClose();
        //   } catch (error) {
        //     console.log("Error occured", error);

        //     setConnectionStatus({ wallet, status: "error" });
        //   }
        // }, 2000);
      }
    } catch (error) {
      handleClose();
      console.log("Error occured", error);

      setConnectionStatus({ wallet, status: "error" });
    }
  };

  return (
    <div className="d-flex">
      <Commonbtn
        className={style.connectbtn}
        title={
          walletAddress ? (
            custmizeAddress(walletAddress)
          ) : (
            <>
              <span className={style.icon}>
                <WalletIcon />
              </span>
              <span className={style.text}>Connect Wallet</span>
            </>
          )
        }
        // title={}
        onClick={() => {
          setShow(true);
        }}
      />
      <Modal
        scrollable={true}
        className={style.connectwlt}
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {walletAddress ? "Disconnect wallet" : "Connect to a wallet"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.connectwlt_main}>
            <Col className="connect_options">
              {walletAddress ? (
                ""
              ) : (
                <ul>
                  {connectionStatus?.wallet === "MetaMasK" && (
                    <li>
                      <div
                        className={`connect_options_details ${
                          connectionStatus?.status === "error" ? "danger" : ""
                        }`}
                      >
                        {connectionStatus?.status === "pending" && (
                          <Spinner animation="border" />
                        )}
                        <p>
                          {connectionStatus?.status === "pending"
                            ? "Initializing..."
                            : connectionStatus?.status === "error"
                            ? "Error Connecting"
                            : ""}
                        </p>
                        {connectionStatus?.status === "error" && (
                          <Commonbtn
                            onClick={() => connectToWallet("MetaMasK")}
                            title="Try Again"
                          />
                        )}
                      </div>
                    </li>
                  )}
                  <li>
                    <Button onClick={() => connectToWallet("MetaMasK")}>
                      <span>
                        <img
                          src={
                            "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                          }
                          alt=""
                        />
                      </span>{" "}
                      &nbsp; MetaMask{" "}
                      {/* {connectionStatus?.wallet === 'MetaMasK' && connectionStatus?.status === 'pending' ? <Spinner animation="border" variant="light" /> : ""} */}
                    </Button>
                  </li>
                </ul>
              )}
              <div className="add_new text-center">
                {walletAddress ? (
                  <Commonbtn
                    className="btn-danger"
                    onClick={() => disconnectWallet()}
                    title="Disconnect"
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>
          </div>
          <Row></Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConnectWallet;
