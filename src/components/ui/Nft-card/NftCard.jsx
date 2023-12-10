import { useEffect, useState } from "react";

import "./nft-card.css";

import { useDispatch } from "react-redux";
import { callContractGetMethod } from "../../../Redux/Actions/contract.action";
import { apiCallGet } from "../../../Services/axios.service";
import { NFT_ADDRESS } from "../../../Utils";
import Modal from "../Modal/Modal";

const NftCard = (props) => {
  console.log("props.item", props.item);
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

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          {type !== "preview" ? (
            <button
              className="bid__btn d-flex align-items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              {type === "listApprove"
                ? props.item.isListed
                  ? "Listed"
                  : "List NFT"
                : props.item.isBought
                ? "Bought"
                : "Buy"}
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
        </div>
      </div>
    </div>
  );
};

export default NftCard;
