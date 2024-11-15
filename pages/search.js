import styled from "styled-components";
import { Center } from "../components/Center";
import Header from "../components/Header";
import Input from "../components/Input";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductsGrid from "../components/ProductsGrid";
import axios from "axios";
import { debounce } from "lodash";
import Spinner from "../components/Spinner";
const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;

  font-size: 1.4rem;
`;
const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;
export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(
    debounce((phrase) => searchProducts(phrase), 500),
    []
  );
  useEffect(() => {
    if (phrase.length >= 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get(`/api/products?phrase=${encodeURIComponent(phrase)}`)
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  function changePhrase(ev) {
    console.log(ev.target.value);
    setPhrase(ev.target.value);
  }
  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
          <SearchInput
            onChange={(ev) => changePhrase(ev)}
            autoFocus
            value={phrase}
            placeholder="Search for porducts ..."
          />
          {!isLoading && phrase !== "" && products.length === 0 && (
            // eslint-disable-next-line react/no-unescaped-entities
            <h1>No Products for query "{phrase}" </h1>
          )}

          {isLoading && <Spinner fullwidth={true} />}
          {!isLoading && products.length > 0 && (
            <ProductsGrid product={products} />
          )}
        </InputWrapper>
      </Center>
    </>
  );
}
