import JSBI from "jsbi";

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

export const convertWithDecimal = (value: any, decimal: any) => {
  decimal = decimal.toString().length - 1;
  const decimalBigN = JSBI.BigInt(decimal);
  const convertedDecimal = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);
  return toWei(toFixed(value), String(convertedDecimal));
};

const toFixed = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

function numberToString(arg: any) {
  if (typeof arg === "string") {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(
        "while converting number to string, invalid number value '" +
          arg +
          "', should be a number matching (^-?[0-9.]+)."
      );
    }
    return arg;
  } else if (typeof arg === "number") {
    return String(arg);
  } else if (
    typeof arg === "object" &&
    arg.toString &&
    (arg.toTwos || arg.dividedToIntegerBy)
  ) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    } else {
      // eslint-disable-line
      return arg.toString(10);
    }
  }
  throw new Error(
    "while converting number to string, invalid number value '" +
      arg +
      "' type " +
      typeof arg +
      "."
  );
}

function toWei(input: any, unit: any) {
  console.log("input, unit", input, unit);
  var ether = numberToString(input); // eslint-disable-line
  var base = unit;
  var baseLength = base.length - 1 || 1;
  if (ether === ".") {
    throw new Error(
      "[ethjs-unit] while converting number " + input + " to wei, invalid value"
    );
  }

  // Is it negative?
  var negative = ether.substring(0, 1) === "-";

  if (negative) {
    ether = ether.substring(1);
  }
  // Split it into a whole and fractional part
  var comps = ether.split("."); // eslint-disable-line
  if (comps.length > 2) {
    throw new Error(
      "[ethjs-unit] while converting number " +
        input +
        " to wei,  too many decimal points"
    );
  }
  var whole = comps[0],
    fraction = comps[1]; // eslint-disable-line
  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }
  if (fraction.length > baseLength) {
    throw new Error(
      "[ethjs-unit] while converting number " +
        input +
        " to wei, too many decimal places"
    );
  }

  while (fraction.length < baseLength) {
    fraction += "0";
  }

  if (!parseInt(whole)) {
    return fraction.replace(/^0*(?=[1-9])/g, "");
  }

  if (negative) {
    return "-" + whole + fraction;
  }

  return whole + fraction;
}

export const divideWithDecimal = (value: any, decimal: any) => {
  if (value === "0") return 0;

  decimal = decimal.toString().length - 1;
  const decimalBigN = JSBI.BigInt(decimal);
  const convertedDecimal = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);

  return fromWei(String(value), String(convertedDecimal));
};

function fromWei(value: any, numberOfDecimals: any) {
  const numberOfZerosInDenomination = numberOfDecimals.length - 1;
  if (numberOfZerosInDenomination <= 0) return value;
  const zeroPaddedValue = value.padStart(numberOfZerosInDenomination, "0");
  const integer = zeroPaddedValue.slice(0, -numberOfZerosInDenomination);
  const fraction = zeroPaddedValue
    .slice(-numberOfZerosInDenomination)
    .replace(/\.?0+$/, "");
  if (integer === "") return `0.${fraction}`;
  if (fraction === "") return integer;
  return `${integer}.${fraction}`;
}
