import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsProduct } from "../../store/asyncActions/detailsProductActions";
import { useParams } from "react-router-dom";
import { ProductDetails } from "../../components/ProductDetails";
import { AppDispatch, RootState } from "../../store";
import { DetailsProductActions } from "../../store/types";
import { ErrorAlert } from "../../components/ErrorAlert";

export const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const isError = useSelector(
    (state: RootState) => state.detailsProduct.isError
  );

  const handleFetch = useCallback(() => {
    dispatch(fetchDetailsProduct(id || ""));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: DetailsProductActions.SET_LOADING_DETAILS,
      payload: true,
    });
    handleFetch();
  }, [dispatch, handleFetch, id]);

  if (isError) {
    return <ErrorAlert onFetch={handleFetch} />;
  }

  return <ProductDetails />;
};
