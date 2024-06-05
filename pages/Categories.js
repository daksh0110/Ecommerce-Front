import React from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import { Center } from "./components/Center";
import { db } from "./components/lib/dbconfig";
import ProductBox from "./components/ProductBox";
import { collection, getDocs, where, query, limit } from "firebase/firestore";
import ProductsGrid from "./components/ProductsGrid";
import styled from "styled-components";
import Link from "next/link";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const CategoryTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  gap: 15px;
  a {
    color: #222;
  }
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;
const Categories = ({ mainCategories, categoryProduct }) => {
  console.log({ categoryProduct });
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((mainCategory, index) => (
          <CategoryWrapper key={index}>
            <CategoryTitle>
              <h2>{mainCategory.name}</h2>
              <div>
                {" "}
                <Link href={"/category/" + mainCategory.id}>Show All</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoryProduct[mainCategory.id].map((cat, index1) => (
                <ProductBox key={cat.id} product={cat} />
              ))}
              <ShowAllSquare href={"/category/" + mainCategory.id}>
                Show all &rarr;
              </ShowAllSquare>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
};

export default Categories;

export async function getServerSideProps() {
  const mainCategories = [];
  const categoryProduct = {};
  const childCategory = [];

  const parentCategoryRef = await getDocs(collection(db, "Categories"));
  const allProductsRef = await getDocs(collection(db, "Products"));
  parentCategoryRef.forEach((doc) => {
    if (doc.data().parent === null) {
      mainCategories.push({ ...doc.data(), id: doc.id });
    } else {
      childCategory.push({ ...doc.data(), id: doc.id });
    }
  });

  for (const main of mainCategories) {
    const Products = [];
    const mainQ = query(
      collection(db, "Products"),
      where("Category", "==", main.id),
      limit(1)
    );
    const childQ = query(
      collection(db, "Categories"),
      where("parent.id", "==", main.id)
    );
    const childSnapshot = await getDocs(childQ);
    const mainQueryProducts = await getDocs(mainQ);
    mainQueryProducts.forEach((doc) => {
      Products.push({ ...doc.data(), id: doc.id });
    });

    for (const childDoc of childSnapshot.docs) {
      const childId = childDoc.id;
      const childProductQ = query(
        collection(db, "Products"),
        where("Category", "==", childId),
        limit(2)
      );
      const childProductSnapshot = await getDocs(childProductQ);
      childProductSnapshot.forEach((doc) => {
        Products.push({ ...doc.data(), id: doc.id });
      });
    }

    categoryProduct[main.id] = Products;

    console.log(categoryProduct);
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoryProduct: JSON.parse(JSON.stringify(categoryProduct)),
    },
  };
}
