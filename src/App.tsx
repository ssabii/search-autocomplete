import { FormEvent, useState } from "react";
import "./App.css";
import useSearchProducts from "./feature/product/useSearchProducts";
import { ChangeEvent } from "react";
import useDebouncedValue from "./hooks/useDebouncedValue";
import SuggestionList from "./feature/product/SuggestionList";
import { searchProducts } from "./api/products";

// TODO: API import
// import { searchProducts, Product } from './api/products';

function App() {
  const [query, setQuery] = useState("");
  const debouncedValue = useDebouncedValue({ value: query });
  const { data: products, isLoading } = useSearchProducts(debouncedValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await searchProducts(query);

    console.log(data);
  };

  return (
    <div className="app">
      <h1>상품 검색</h1>

      <form className="search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="상품을 검색하세요"
          className="search-input"
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>

      {/* TODO: 자동완성 목록 구현 */}
      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <SuggestionList products={products ?? []} />
      )}

      {/* TODO: 최근 검색어 구현 */}
    </div>
  );
}

export default App;
