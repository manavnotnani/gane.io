import React from "react";
import "./NoRecordFound.scss";
import { Nodataicon } from "../../assets/Icons/Svg_icons";

const NoRecordFound = () => {
  return (
    <div className="no-record">
      <span>
        <Nodataicon />
      </span>
      <p>No Record Found</p>
    </div>
  );
};

export default NoRecordFound;
