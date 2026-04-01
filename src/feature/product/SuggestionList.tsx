import { Product } from "../../api/products";

interface SuggestionListProps {
  products: Product[];
}

function SuggestionList({ products }: SuggestionListProps) {
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

export default SuggestionList;
