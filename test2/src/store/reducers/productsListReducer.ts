import { ProductsListDTO } from "../../types/Products";
import { ProductsListActions } from "../types";

type ProductsListState = {
  isLoading: boolean;
  isError: boolean;
  items: ProductsListDTO[];
};

type ActionType = {
  type: ProductsListActions;
  payload: boolean | ProductsListDTO[];
};

const initialState: ProductsListState = {
  isError: false,
  isLoading: false,
  items: [],
};

export const productsListReducer = (
  state = initialState,
  action: ActionType
): ProductsListState => {
  switch (action.type) {
    case ProductsListActions.SET_LOADING:
      return { ...state, isLoading: action.payload as boolean };

    case ProductsListActions.FETCH_LIST:
      return { ...state, items: action.payload as ProductsListDTO[] };

    case ProductsListActions.SET_ERROR:
      return { ...state, isError: action.payload as boolean };
    default:
      return state;
  }
};
