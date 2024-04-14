import { Center } from "../components/Center";
import Header from "../components/Header";
import Title from "../components/Title";
import { doc, getDoc, query } from "firebase/firestore";
import { db } from "../components/lib/dbconfig";
import styled from "styled-components";
import WhiteBox from "../components/WhiteBox";
import ProductImages from "../components/ProductImages";
import Button from "../components/Button";
import Cart from "../components/icons/Cart";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;
const PriceRow = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
`;
const Price = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;
export default function ProductPage({ product, id }) {
  const { addProduct } = useContext(CartContext);
  console.log(product);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.Images} />
          </WhiteBox>
          <div>
            <Title>{product.Title}</Title>
            <p>{product.Description}</p>
            <PriceRow>
              <Price>Rs {product.Price}</Price>
              <div>
                <Button primary onClick={() => addProduct(id)}>
                  {" "}
                  <Cart />
                  Add to Cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const productId = context.query.id;
  const docRef = doc(db, "Products", productId);
  const docSnap = await getDoc(docRef);
  const product = docSnap.data();
  console.log("id==" + docSnap.id);
  return {
    props: { product: JSON.parse(JSON.stringify(product)), id: docSnap.id },
  };
}
