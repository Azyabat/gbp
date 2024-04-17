export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  content: string;
};

export type ProductsListDTO = Omit<ProductDTO, "content">;
