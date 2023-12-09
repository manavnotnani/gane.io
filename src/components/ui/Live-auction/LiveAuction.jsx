import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import NftCard from "../Nft-card/NftCard";
import { NFT__DATA } from "../../../assets/data/data.js";

import "./live-auction.css";
import { useDispatch } from "react-redux";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";

const LiveAuction = () => {
  const dispatch = useDispatch();

  const [nfts, setNfts] = useState([]);

  const getNfts = async () => {
    let data = await dispatch(callApiGetMethod("BUY_NFTS", {}, false, false));

    console.log("data", data);

    if (data) {
      setNfts(data.nfts);
    }
  };

  console.log("nfts", nfts);

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>Live Auction</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>

          {nfts &&
            nfts.map((item, index) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <NftCard key={index} item={item} type="buy" id={item.TokenId} />
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
