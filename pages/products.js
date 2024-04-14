import React from "react";
import Header from "./components/Header";
import styled from "styled-components";
import { Center } from "./components/Center";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./components/lib/dbconfig";
import ProductsGrid from "./components/ProductsGrid";
const Title = styled.h1`
  font-size: 1.5em;
`;
const products = ({ products }) => {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid product={products} />
      </Center>
    </>
  );
};

export default products;

export async function getServerSideProps() {
  const collectionRef = collection(db, "Products");
  const querySnapshot = await getDocs(
    query(collectionRef, orderBy("createdAt"))
  );
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
