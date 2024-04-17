import { ProductDTO } from "../../types/Products";
import { DetailsProductActions } from "../types";

type DetailsProductState = {
  isLoading: boolean;
  isError: boolean;
  item: ProductDTO | null;
};

type ActionType = {
  type: DetailsProductActions;
  payload: boolean | ProductDTO;
};

const initialState: DetailsProductState = {
  isLoading: false,
  isError: false,
  item: null,
};

export const detailsProductReducer = (
  state = initialState,
  action: ActionType
): DetailsProductState => {
  switch (action.type) {
    case DetailsProductActions.FETCH_DATA:
      return { ...state, item: action.payload as ProductDTO };
    case DetailsProductActions.SET_LOADING_DETAILS:
      return { ...state, isLoading: action.payload as boolean };
    case DetailsProductActions.SET_ERROR:
      return { ...state, isError: action.payload as boolean };
    default:
      return state;
  }
};
