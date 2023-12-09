import axios from "axios";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import toaster from "../components/Common/Toast/toast";
import store from "../Redux/Store";
import { APIURL, API_HOST } from "../Utils";
import { formatUrl } from "./common.service";

export const storeInstance = store;
axios.defaults.baseURL = API_HOST;


/**HANDLE AXIOS ERROR */
function manageErrorConnection(err) {
  if (
    err.response &&
    err.response.status >= 400 &&
    err.response.status <= 500
  ) {
    toaster.error(
      err.response.data.msg
        ? err.response.data.msg
        : "Server not responding. Please try again later."
    );

    return Promise.reject(err);
  } else if (err.code === "ECONNREFUSED") {
    toaster.error("ECONNREFUSED");
    return "nevermind";
  } else {
    toaster.error(err);
    return Promise.reject(err);
  }
}

/**HANDLE AXIOS SUCCESS */
function handleSuccess(res) {
  res?.data?.message && toaster.success(res.data.message);
}

/**METHOD FOR CALL API */
export const apiCallPost = (url, data, params = {}, showtoaster = false) =>
  new Promise((resolve, reject) => {
    axios
      .post(formatUrl(url, params), data)
      .then((res) => {
        showtoaster && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

/**METHOD FOR SEND API */
export const apiCallGet = (url, params = {}, showtoaster = false) =>
  new Promise((resolve) => {
    axios
      .get(formatUrl(url, params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        resolve(null);
      });
  });

export const openNewTab = (url, params) =>
  new Promise((resolve) => {
    window.open(`${formatUrl(API_HOST + url, params)}`, "_blank");
  });

/** CALL EXPORT CSV*/
export const openInNewTab = (method: string, parms: any = {}) => {
  return (dispatch: Dispatch<any> = useDispatch(), getState: any) =>
    new Promise(async (resolve, reject) => {
      Object.keys(parms).forEach((key) =>
        parms[key] === undefined || parms[key] === null || parms[key] === ""
          ? delete parms[key]
          : {}
      );
      openNewTab(APIURL[method], parms)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          manageErrorConnection(err);
          reject(err);
        });
    });
};
