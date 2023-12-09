import { Col, Container, Row } from "reactstrap";
import img from "../assets/images/img-01.jpg";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";

import { Formik, useFormik } from "formik";
import Commonbtn from "../components/Common/Commonbutton/Commonbtn";
import "../styles/create-item.css";
import "./FormStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { callApiPostMethod } from "../Redux/Actions/api.action";
import { callContractSendMethod } from "../Redux/Actions/contract.action";
import { IMPLEMENTATION_ADDRESS, NFT_ADDRESS } from "../Utils";

const item = {
  id: "01",
  title: "Guard",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
  imgUrl: img,
  currentBid: 7.89,
};

const Create = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state?.user?.walletAddress);

  const formik = useFormik({
    initialValues: {
      name: "",
      trait: "",
      traitValue: "",
      description: "",
      imgUrl: "",
    },

    async onSubmit(values) {
      console.log(values);

      const valuesToSend = {
        name: values.name,
        attributes: {
          trait_type: values.trait,
          value: values.traitValue,
        },
        description: values.description,
        image: values.imgUrl,
      };

      console.log(valuesToSend);

      let params = {
        name: values.name,
        text: valuesToSend,
      };
      
      let apiRes = await dispatch(
        callApiPostMethod("CREATE_TBA", params, {}, false)
      );

      console.log("API res:::::", apiRes);

      if (apiRes && apiRes.link) {
        console.log("Entered");
        let contractRes = await dispatch(
          callContractSendMethod(
            "create6551Account",
            [walletAddress, apiRes.link, IMPLEMENTATION_ADDRESS, "0x"],
            walletAddress,
            "NFT",
            "",
            NFT_ADDRESS
          )
        );
      }
    },
  });

  // console.log(formik.values);

  return (
    <>
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col lg="3" md="4" sm="6">
                <h5 className="mb-4 text-light">Preview Item</h5>
                <NftCard item={formik.values} />
              </Col>

              <Col lg="9" md="8" sm="6">
                <div className="create__item">
                  <div className="form__input">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      name="name"
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">URL (IPFS Link)</label>
                    <input
                      type="text"
                      placeholder="Enter the full IPFS link"
                      onChange={formik.handleChange}
                      value={formik.values.imgUrl}
                      name="imgUrl"
                    />
                  </div>

                  <Col xs={12}>
                    <label htmlFor="">Trait</label>
                    <Row>
                      <Col xs={4}>
                        <div className="form__input">
                          <label htmlFor="">Trait</label>
                          <input
                            type="text"
                            placeholder="Enter Trait Name"
                            onChange={formik.handleChange}
                            name="trait"
                            value={formik.values.trait}
                          />
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div className="form__input">
                          <label htmlFor="">Value</label>
                          <input
                            type="text"
                            placeholder="Enter Max Value"
                            onChange={formik.handleChange}
                            value={formik.values.traitValue}
                            name="traitValue"
                          />
                        </div>
                      </Col>

                      {/* <Col xs={3}>
                          <div className="form__input">
                            <label htmlFor="">Min Value</label>
                            <input
                              type="number"
                              placeholder="Enter Min Value"
                              onChange={(e) => formik.handleChange(e)}
                              value={formik.values.minint}
                            />
                          </div>
                        </Col> */}
                      {/* <Col xs={2}>
                          <div className="form__input">
                            <button type="button">
                              <CirclePlusIcon />
                            </button>
                          </div>
                        </Col> */}
                    </Row>
                  </Col>

                  {/* <div className=" d-flex align-items-center gap-4">
                      <div className="form__input w-50">
                        <label htmlFor="">Starting Date</label>
                        <input type="date" />
                      </div>

                      <div className="form__input w-50">
                        <label htmlFor="">Expiration Date</label>
                        <input type="date" />
                      </div>
                    </div>

                    <div className="form__input">
                      <label htmlFor="">Title</label>
                      <input type="text" placeholder="Enter title" />
                    </div> */}

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      name="description"
                    ></textarea>
                  </div>
                </div>
              </Col>
            </Row>

            <Commonbtn
              className={"submitBtn"}
              title="Submit"
              type="submit"
              // disabled={
              //   (formik.values.receiverAddress && !validReceiver) ||
              //   (formik.values.tokenAddress && !validToken)
              // }
            />
          </form>
        </Container>
      </section>
    </>
  );
};

export default Create;
