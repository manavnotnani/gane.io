import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./nft-card.css";

import Modal from "../Modal/Modal";
import { callContractGetMethod } from "../../../Redux/Actions/contract.action";
import { NFT_ADDRESS } from "../../../Utils";
import { useDispatch } from "react-redux";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";
import { apiCallGet } from "../../../Services/axios.service";

const NftCard = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [nftImage, setNftImage] = useState("");

  const { image } = props.item;
  const type = props.type;

  const getImage = async () => {
    if (!image) {
      const data = await dispatch(
        callContractGetMethod(
          "tokenURI",
          [props.item.TokenId],
          "NFT",
          false,
          NFT_ADDRESS,
          false
        )
      );

      const jsonData = await apiCallGet(data, {}, false);
      setNftImage(jsonData?.image);
    }
  };

  useEffect(() => {
    if (image) setNftImage(image);
    else getImage();
  }, [props]);

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img
          src={
            nftImage
              ? nftImage
              : "https://www.carnival.com.au/_ui/responsive/ccl/assets/images/notfound_placeholder.svg"
          }
          alt=""
          className="w-100"
        />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">{props.item.name}</h5>

        {/* <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{creator}</p>
            </div>

            <div>
              <h6>Current Bid</h6>
              <p>{currentBid} ETH</p>
            </div>
          </div>
        </div> */}

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          {/* <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => navigate(`/market/${props.id}`)}
          >
            View
          </button> */}

          {type !== "preview" ? (
            <button
              className="bid__btn d-flex align-items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              {type === "listApprove" ? "List NFT" : "Buy"}
            </button>
          ) : (
            ""
          )}

          {showModal && (
            <Modal
              setShowModal={setShowModal}
              type={props.type}
              item={props.item}
            />
          )}
          {/* <span className="history__link">
            <Link to="#">View History</Link>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
