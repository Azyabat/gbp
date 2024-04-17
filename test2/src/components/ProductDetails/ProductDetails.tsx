import { Spin } from "antd";
import { useSelector } from "react-redux";
import "./ProductDetails.css";
import { RootState } from "../../store";

export const ProductDetails = () => {
  const detail = useSelector((state: RootState) => state.detailsProduct.item);
  const isLoading = useSelector(
    (state: RootState) => state.detailsProduct.isLoading
  );

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <div className="product-wrapper">
      <p>Имя: {detail?.name}</p>
      <p>Цена: {detail?.price}</p>
      <p>Описание: {detail?.content}</p>
    </div>
  );
};
