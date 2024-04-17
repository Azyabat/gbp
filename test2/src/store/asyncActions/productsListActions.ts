import { Dispatch } from "redux";
import { ProductsListActions } from "../types";

export const fetchProductsList = () => {
  return (dispatch: Dispatch) => {
    fetch("http://localhost:7070/api/services")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch({ type: ProductsListActions.SET_ERROR, payload: false });
        dispatch({ type: ProductsListActions.FETCH_LIST, payload: json });
      })
      .catch(() => {
        dispatch({ type: ProductsListActions.SET_ERROR, payload: true });
      })
      .finally(() => {
        dispatch({ type: ProductsListActions.SET_LOADING, payload: false });
      });
  };
};
