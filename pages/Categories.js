import React from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import { Center } from "./components/Center";
import { db } from "./components/lib/dbconfig";
import { collection, getDocs, where, query } from "firebase/firestore";

const Categories = ({ mainCategories, categoryProduct }) => {
  console.log(categoryProduct);
  return (
    <>
      <Header />
      <Center>
        <Title>All categories</Title>
        {/* {mainCategories.map((mainCategory, index) => (
          <div key={index}>
            <h2> {mainCategory.name}</h2>
            <div>
              {categoryProduct[mainCategory.id].map((cat, index1) => (
                <div key={mainCategory.id}>
                  <p> {cat.Title}</p>
                </div>
              ))}
            </div>
          </div>
        ))} */}
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
    // doc.data() is never undefined for query doc snapshots

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
      where("Category", "==", main.id)
    );

    const mainQueryProducts = await getDocs(mainQ);
    mainQueryProducts.forEach((doc) => {
      Products.push({ ...doc.data(), id: doc.id });
    });
    for (const child of childCategory) {
      allProductsRef.forEach((doc) => {
        if (child.parent.id === main.id)
          Products.push({ ...doc.data(), id: doc.id });
      });
    }

    categoryProduct[main.id] = Products;
    // console.log({ Products });
  }
  console.log("============");
  console.log({ categoryProduct });
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoryProduct: JSON.parse(JSON.stringify(categoryProduct)),
    },
  };
}
