import React, { useEffect, useState } from "react";

import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  callContractGetMethod,
  callContractSendMethod,
} from "../../../Redux/Actions/contract.action";
import { NFT_ADDRESS, NFT_MARKETPLACE } from "../../../Utils";
import {
  convertWithDecimal,
  divideWithDecimal,
} from "../../../Services/common.service";

const Modal = ({ setShowModal, type, item }) => {
  const [currentType, setCurrentType] = useState(type);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state?.user?.walletAddress);

  useEffect(() => {
    setCurrentType(type);
  }, [type]);

  const handleSubmit = async () => {
    switch (currentType) {
      case "listApprove":
        const approve = await dispatch(
          callContractGetMethod(
            "getApproved",
            [item.tokenId],
            "NFT",
            false,
            NFT_ADDRESS,
            false
          )
        );

        console.log("approve", approve);

        if (approve !== NFT_MARKETPLACE) {
          const res = await dispatch(
            callContractSendMethod(
              "approve",
              [NFT_MARKETPLACE, item.tokenId],
              walletAddress,
              "NFT",
              "",
              NFT_ADDRESS
            )
          );

          console.log(res, "res::::::");

          setCurrentType("listNFT");
        } else {
          setCurrentType("listNFT");
        }

        break;

      case "listNFT":
        const amount = convertWithDecimal(inputValue, 10 ** 18);
        let tokenId = item.tokenId;

        let dataToSend = {
          owner: walletAddress,
          tokenContract: NFT_ADDRESS,
          tokenID: tokenId,
          price: amount,
        };

        const result = await dispatch(
          callContractSendMethod(
            "listNFT",
            [dataToSend],
            walletAddress,
            "Marketplace",
            "",
            NFT_MARKETPLACE
          )
        );
        break;

      case "buy":
        const orderId = item.OrderId;

        const res = await dispatch(
          callContractSendMethod(
            "buy",
            [orderId, walletAddress],
            walletAddress,
            "Marketplace",
            item.Price,
            NFT_MARKETPLACE
          )
        );
        break;

      default:
        break;
    }
  };

  console.log("item", item);

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">
          {currentType === "buy" ? "Buy NFT" : "List your NFT"}
        </h6>
        <p className="text-center text-light">
          {currentType === "listApprove"
            ? "You need to approve your NFT"
            : currentType === "listNFT"
            ? "List your NFT and enter the price"
            : `Buy NFT for ${divideWithDecimal(item?.Price, 10 ** 18)} MATIC`}
        </p>
        {currentType === "listApprove" ? (
          ""
        ) : currentType === "listNFT" ? (
          <>
            <div className="input__item mb-4">
              <h6>Enter listing price</h6>
              <input
                currentType="number"
                placeholder="0 Matic"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </>
        ) : (
          ""
        )}

        <button className="place__bid-btn" onClick={handleSubmit}>
          {currentType === "listApprove"
            ? "Approve"
            : currentType === "listNFT"
            ? "List NFT"
            : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
