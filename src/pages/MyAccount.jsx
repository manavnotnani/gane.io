import { init, useQuery } from "@airstack/airstack-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { AIRSTACK_API } from "../Utils";
import CommonSection from "../components/ui/Common-section/CommonSection";
import "../styles/market.css";
import { getTokensAirstack } from "./Queries";
import { useQueries } from "react-query";
import NftCard from "../components/ui/Nft-card/NftCard";
import NoRecordFound from "../components/NoRecordFound/NoRecordFound";

init(AIRSTACK_API);

const MyAccount = () => {
  const [userNFTs, setUserNFTs] = useState([]);

  const walletAddress = useSelector((state) => state?.user?.walletAddress);

  const { data } = useQuery(getTokensAirstack, {
    walletAddress: walletAddress,
    chain: "polygon",
  });

  const updateUserNFTs = async () => {
    if (data) {
      let arrData = data?.TokenBalances?.TokenBalance;
      let temp = [];

      for (let i = 0; i < arrData.length; i++) {
        console.log("arrData[i].tokenNFTs?.erc6551Accounts", arrData[i]);
        if (arrData[i].tokenNfts?.erc6551Accounts?.length > 0) {
          let tokenId = arrData[i].tokenId;
          console.log("tokenId", tokenId);
          let nft = arrData[i].tokenNfts;
          console.log("nft", nft);

          let finalNFT = {
            tokenId: tokenId,
            address: nft?.erc6551Accounts[0]?.address.addresses,
            description: nft?.metaData?.description,
            image: nft?.metaData?.image,
            attributes: nft?.metaData?.attributes,
            name: nft?.metaData?.name,
          };

          temp.push(finalNFT);
        }
      }

      setUserNFTs(temp);
    }
  };

  console.log("userNFTs", userNFTs);

  useEffect(() => {
    updateUserNFTs();
  }, [data]);

  return (
    <>
      <CommonSection title={"My NFTs"} />

      <section>
        <Container>
          <Row>
            {/* <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="virtual-world">Virtual World</option>
                      <option value="trending-card">Trending Cards</option>
                    </select>
                  </div>

                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col> */}

            {userNFTs.length > 0 ? (
              userNFTs?.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                  <NftCard item={item} type="listApprove" />
                </Col>
              ))
            ) : (
              <NoRecordFound />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MyAccount;
