import { useContext, useEffect, useState } from "react";
import Button from "./components/Button";
import { Center } from "./components/Center";
import Header from "./components/Header";
import styled from "styled-components";
import { CartContext } from "./components/CartContext";
import axios from "axios";
import Table from "./Table";
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 150px;
  height: 150px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 130px;
    max-height: 130px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function LessOfThisProduct(id) {
    removeProduct(id);
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p.id === productId)?.Price || 0;
    console.log(price);
    total = total + price;
    `Total==${"ewf" + total}`;
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>your Cart is Empty</div>}
            <h2>Cart</h2>
            {cartProducts.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>product</th>
                    <th>Quantity</th>
                    <th>Price </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.Images[0]} />
                        </ProductImageBox>

                        {product.Title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => LessOfThisProduct(product.id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product.id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product.id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        Rs{" "}
                        {product.Price *
                          cartProducts.filter((id) => id === product.id).length}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              {" "}
              <h2>Order Information</h2>
              <input type="text" placeholder="Address 1" />
              <input type="text" placeholder="Address 2" />
              <Button black block>
                Continue to Payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
