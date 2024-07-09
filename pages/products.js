import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Center } from "../components/Center";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../components/lib/dbconfig";
import ProductsGrid from "../components/ProductsGrid";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Title = styled.h1`
  font-size: 1.5em;
`;
const products = ({ products, wishedProducts }) => {
  console.log(wishedProducts);
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid product={products} wishedProducts={wishedProducts[0]} />
      </Center>
    </>
  );
};

export default products;

export async function getServerSideProps(ctx) {
  const collectionRef = collection(db, "Products");
  const querySnapshot = await getDocs(
    query(collectionRef, orderBy("createdAt"))
  );
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  let wishedProducts = [];
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const user = session?.user;
  if (user) {
    const UserRefs = collection(db, "WishList");
    const q = query(UserRefs, where("userEmail", "==", user.email));
    const wishListDocument = await getDocs(q);
    wishListDocument.forEach((doc) => {
      wishedProducts.push({ ...doc.data().products });
    });
    console.log("wishedproducts===" + wishedProducts);
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts,
    },
  };
}
