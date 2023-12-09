export const custmizeAddress = (address: string) => {
  let firstFive = address.substring(0, 5);
  let lastFour = address.substring(address.length - 4);
  return firstFive + "..." + lastFour;
};

export const formatUrl = (url, params) => {
  params =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : ``;
  return `${url}${params}`;
};

export const getError = (error: any) => {
  let errorMsg =
    error && error.message ? error.message : "Something went wrong";

  if (errorMsg.toString().indexOf('"message"') > -1) {
    let index = errorMsg.toString().indexOf('"message"');

    let newErr = errorMsg.slice(index);
    index = newErr.toString().indexOf(",");
    let msg = newErr.slice(0, index).split(":")[1];

    return msg.replace(/['"]+/g, "");
  } else if (errorMsg.indexOf("execution reverted") > -1) {
    let msg = errorMsg;
    msg = msg =
      msg.indexOf("execution reverted:") > -1
        ? msg.split("execution reverted:")[1].split("{")[0]
        : msg;
    return msg;
  } else if (errorMsg.indexOf("INVALID_ARGUMENT") > -1) {
    return errorMsg.split("(")[0];
  } else if (errorMsg.indexOf("MetaMask Tx Signature") > -1) {
    let msg = errorMsg.replace("MetaMask Tx Signature:", "");
    return msg;
  } else {
    let err = errorMsg.split("*")[0].split(":")[1];
    if (err?.trim() === "insufficient funds for gas") {
      return err;
    } else {
      return errorMsg;
    }
  }
};
