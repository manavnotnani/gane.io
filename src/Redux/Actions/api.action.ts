import { apiCallPost, apiCallGet } from "../../Services/axios.service";
import { APIURL } from "../../Utils";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
// import { loader } from "../Slices/loader.slice";

/**CALL API'S GET METHODS */
export const callApiGetMethod = (
  method: string,
  parms: any = {},
  loading = true,
  showtoaster: boolean = true
) => {
  return (dispatch: Dispatch<any> = useDispatch(), getState: any) =>
    new Promise(async (resolve, reject) => {
      /**SHOW LOADER */
      //   if (loading) dispatch(loader(true));
      /**CALL METHOD */
      apiCallGet(APIURL[method], parms, showtoaster)
        .then((result) => {
          //   if (loading) dispatch(loader(false));
          resolve(result);
        })
        .catch((err) => {
          //   if (loading) dispatch(loader(false));
          reject(err);
        });
    });
};

/**CALL API'S SEND METHOD */
export const callApiPostMethod = (
  method: string,
  data: any = {},
  parms: any = {},
  showtoaster: boolean = false
) => {
  return (dispatch: Dispatch<any> = useDispatch(), getState: any) =>
    new Promise(async (resolve, reject) => {
      /**SHOW LOADER */
      //   dispatch(loader(true));

      /**CALL METHOD */
      apiCallPost(APIURL[method], data, parms, showtoaster)
        .then((result) => {
          // dispatch(loader(false));
          resolve(result);
        })
        .catch((err) => {
          //   dispatch(loader(false));
        });
    });
};
