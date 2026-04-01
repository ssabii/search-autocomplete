import { ChangeEvent, FormEvent, useState } from "react";
import { searchProducts } from "./api/products";
import RecentQueryList from "./feature/product/RecentQueryList";
import SuggestionList from "./feature/product/SuggestionList";
import useSearchProducts from "./feature/product/useSearchProducts";
import useDebouncedValue from "./hooks/useDebouncedValue";

import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [recentQueries, setRecentQueries] = useState<string[] | undefined>(
    undefined,
  );
  const debouncedValue = useDebouncedValue({ value: query });
  const { data: products, isLoading } = useSearchProducts(debouncedValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await searchProducts(query);

    const recentQueriesKey = "recentQueries";
    const storageData = localStorage.getItem(recentQueriesKey);
    const parsedData = storageData ? (JSON.parse(storageData) as string[]) : [];

    parsedData.push(query);
    const newParsedData = parsedData.slice(-5);
    const stringifiedData = JSON.stringify(newParsedData);
    localStorage.setItem(recentQueriesKey, stringifiedData);

    console.log(data);
    setRecentQueries(newParsedData);
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
      ) : products ? (
        <SuggestionList products={products ?? []} />
      ) : null}

      {/* TODO: 최근 검색어 구현 */}
      <RecentQueryList recentQueries={recentQueries} />
    </div>
  );
}

export default App;
