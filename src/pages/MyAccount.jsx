import { init, useQuery } from "@airstack/airstack-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { AIRSTACK_API } from "../Utils";
import NoRecordFound from "../components/NoRecordFound/NoRecordFound";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import "../styles/market.css";
import { getTokensAirstack } from "./Queries";

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
          let nft = arrData[i].tokenNfts;

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
