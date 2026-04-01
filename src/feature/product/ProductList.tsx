import { Product } from "../../api/products";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {products.map((item) => (
        <div
          key={item.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>{item.name}</div>
          <div>{item.category}</div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
