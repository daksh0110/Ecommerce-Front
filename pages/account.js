import { signIn, signOut, useSession } from "next-auth/react";
import { Center } from "./components/Center";
import Header from "./components/Header";
import Title from "./components/Title";
import Button from "./components/Button";
import styled from "styled-components";
import WhiteBox from "./components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./components/Spinner";
import ProductBox from "./components/ProductBox";
import Tabs from "./components/Tabs";

import SingleOrder from "./components/SingleOrder";
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 8px;
  }
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;
export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]);
  async function logOut() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function logIn() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  function saveAddress() {
    const data = { name, email, city, postalCode, streetAddress, country };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    if (!session) {
      return;
    } else {
      setAddressLoaded(false);
      setWishlistLoaded(false);
      setOrderLoaded(false);
      axios.get("/api/address").then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setCity(response.data.city);
        setPostalCode(response.data.postalCode);
        setStreetAddress(response.data.streetAddress);
        setCountry(response.data.country);
        setAddressLoaded(true);
      });
    }

    axios.get("/api/wishlist").then((response) => {
      setWishedProducts(response.data.wishListProducts);

      setWishlistLoaded(true);
    });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
  }, [session]);
  function productRemoved(id) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p.id !== id)];
    });
  }
  return (
    <>
      <Header />

      <Center>
        <ColWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={["Orders", "Wishlist"]}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === "Orders" && (
                  <>
                    {!orderLoaded && <Spinner fullwidth={true} />}

                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && <p>Login to see your orders</p>}
                        {orders.length > 0 &&
                          orders.map((o) => (
                            <SingleOrder
                              createdAt={o.createdAt}
                              {...o.products}
                              {...o}
                            />
                          ))}
                      </div>
                    )}
                  </>
                )}
                {activeTab === "Wishlist" && (
                  <>
                    <h2>WishList</h2>
                    {!wishlistLoaded && <Spinner fullwidth={true} />}
                    {wishlistLoaded && (
                      <>
                        <WishedProductsGrid>
                          {wishedProducts.length > 0 &&
                            wishedProducts.map((wp) => (
                              <ProductBox
                                key={wp.id}
                                wished={true}
                                product={wp}
                                onRemoveFromList={productRemoved}
                              />
                            ))}
                        </WishedProductsGrid>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && <p>Your WishList is Empty</p>}
                            {!session && (
                              <p>Login to add products to your wishlist</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? "Account details" : "Login"}</h2>

                {!addressLoaded && <Spinner fullwidth={true} />}
                {addressLoaded && session && (
                  <>
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

                    <Button black block onClick={saveAddress}>
                      Save
                    </Button>
                    <hr />
                  </>
                )}

                {session && (
                  <Button
                    primary
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Log Out
                  </Button>
                )}
                {!session && (
                  <Button primary onClick={logIn}>
                    Log In With Google
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}
