import { useContext, useEffect, useState } from "react";
import Button from "./components/Button";
import { Center } from "./components/Center";
import Header from "./components/Header";
import styled from "styled-components";
import { CartContext } from "./components/CartContext";
import axios from "axios";
import Table from "./Table";
import Input from "./components/Input";
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

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
export default function CartPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

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
  let total = 0; // Ensure total is initialized as a number
  for (const productId of cartProducts) {
    const price = +products.find((p) => p.id === productId)?.Price || 0;
    console.log(total);
    total = total + price;
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      country,
      streetAddress,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  if (window.location.href.includes("success")) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order</h1>
              <p>We will email you when your order will arrive shorlty</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>your Cart is Empty</div>}

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
                    <td>Total</td>
                    <td>Rs {total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              {" "}
              <h2>Order Information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                name="name"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                name="email"
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                  name="city"
                />
                <Input
                  type="number"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                  name="postalCode"
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
                name="streetAddress"
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
                name="country"
              />
              <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              />
              <Button black block onClick={goToPayment}>
                Continue to Payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
