import { Dispatch } from "redux";
import { DetailsProductActions } from "../types";

export const fetchDetailsProduct = (id: string) => {
  return (dispatch: Dispatch) => {
    fetch(`http://localhost:7070/api/services/${id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: DetailsProductActions.SET_ERROR, payload: false });
        dispatch({ type: DetailsProductActions.FETCH_DATA, payload: json });
      })
      .catch(() => {
        dispatch({ type: DetailsProductActions.SET_ERROR, payload: true });
      })
      .finally(() => {
        dispatch({
          type: DetailsProductActions.SET_LOADING_DETAILS,
          payload: false,
        });
      });
  };
};
