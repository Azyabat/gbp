import { applyMiddleware, combineReducers, createStore } from "redux";
import { productsListReducer } from "./reducers/productsListReducer";
import { detailsProductReducer } from "./reducers/detailsProductReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  productsList: productsListReducer,
  detailsProduct: detailsProductReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
