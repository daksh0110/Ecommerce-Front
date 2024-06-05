import { Center } from "../components/Center";
import Header from "../components/Header";
import Title from "../components/Title";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../components/lib/dbconfig";
import ProductBox from "../components/ProductBox";
import ProductsGrid from "../components/ProductsGrid";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Spinner from "../components/Spinner";
const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5em;
  }
`;
const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;
export default function CategoryPage({
  category,
  subCategories,
  Products: originalProducts,
}) {
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFilterValues] = useState(
    category.properties.map((prop) => ({ name: prop.name, value: "All" }))
  );
  const [sort, setSort] = useState("Price_desc");
  const [loadingProducts, setLoadingProducts] = useState(false);
  function handleFilterChnage(filterName, filterValue) {
    setFilterValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
  }
  useEffect(() => {
    setLoadingProducts(true);
    const fetchProducts = async () => {
      const catIds = [...subCategories];
      const params = new URLSearchParams();
      params.set("categories", catIds.join(","));
      params.set("sort", sort);
      filtersValues.forEach((f) => {
        if (f.value !== "All") {
          params.set(f.name, f.value);
        }
      });

      const url = "/api/products?" + params.toString();
      try {
        const res = await axios.get(url);
        console.log(res.data);
        setProducts(res.data);
        setTimeout(() => {
          setLoadingProducts(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [filtersValues, subCategories, sort]);

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>
          <FilterWrapper>
            {category.properties.map((property, index) => (
              <Filter key={index}>
                <span>{property.name}:</span>

                <select
                  onChange={(ev) =>
                    handleFilterChnage(property.name, ev.target.value)
                  }
                  value={
                    filtersValues.find((f) => f.name === property.name).value
                  }
                >
                  <option value={"All"}>All</option>
                  {property.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>sorting:</span>
              <select value={sort} onChange={(ev) => setSort(ev.target.value)}>
                <option value={"Price_asc"}>price,lowest first</option>
                <option value={"Price_desc"}>price,highest first</option>
                <option value={"id_desc"}>Newest first</option>
                <option value={"id_asc"}>Oldest First</option>
              </select>
            </Filter>
          </FilterWrapper>
        </CategoryHeader>
        {!loadingProducts && <ProductsGrid product={products} />}
        {loadingProducts && <Spinner fullwidth />}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  const SubCategories = [id];
  const Products = [];
  const CategoryRef = doc(db, "Categories", id);
  const docSnap = await getDoc(CategoryRef);

  const SubCategoryquery = query(
    collection(db, "Categories"),
    where("parent.id", "==", id)
  );

  const querySnapshot = await getDocs(SubCategoryquery);
  querySnapshot.forEach(async (doc) => {
    SubCategories.push(doc.id);
  });

  for (const CategoryId of SubCategories) {
    const ProductQuery = query(
      collection(db, "Products"),
      where("Category", "==", CategoryId)
    );
    const querySnapshot = await getDocs(ProductQuery);
    querySnapshot.forEach(async (doc) => {
      Products.push({ id: doc.id, ...doc.data() });
    });
  }
  //   console.log(Products);
  return {
    props: {
      category: JSON.parse(JSON.stringify(docSnap.data())),
      subCategories: JSON.parse(JSON.stringify(SubCategories)),
      Products: JSON.parse(JSON.stringify(Products)),
    },
  };
}
