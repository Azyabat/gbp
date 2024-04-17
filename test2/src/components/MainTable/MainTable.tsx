import { Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { ProductsListDTO } from "../../types/Products";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type DataType = ProductsListDTO;

const columns: TableColumnsType<DataType> = [
  {
    key: "name",
    title: "Имя",
    dataIndex: "name",
    render: (name: string, record) => (
      <Link to={`/${record.id}/details`}>{name}</Link>
    ),
  },
  {
    key: "price",
    title: "Цена",
    dataIndex: "price",
    render: (price: number) => <span>{price}</span>,
  },
];

export const MainTable = () => {
  const tableData = useSelector((state: RootState) => state.productsList.items);
  const loadingData = useSelector(
    (state: RootState) => state.productsList.isLoading
  );

  return (
    <Table
      rowKey="id"
      loading={loadingData}
      dataSource={tableData}
      columns={columns}
    />
  );
};
