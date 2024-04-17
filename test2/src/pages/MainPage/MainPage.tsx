import { useCallback, useEffect } from "react";
import { MainTable } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../../store/asyncActions/productsListActions";
import { AppDispatch, RootState } from "../../store";
import { ProductsListActions } from "../../store/types";
import { ErrorAlert } from "../../components/ErrorAlert";

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isError = useSelector((state: RootState) => state.productsList.isError);

  const handleFetch = useCallback(() => {
    dispatch(fetchProductsList());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: ProductsListActions.SET_LOADING, payload: true });
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return <ErrorAlert onFetch={handleFetch} />;
  }
  return <MainTable />;
};
