import Button from "@/components/Button";
import { CartContext } from "@/components/CarContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  img {
    max-width: 40px;
    max-height: 40px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;
const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 3px;
  }
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState([]);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // This code will only run on the client side
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (window?.location.href.includes("success")) {
      setIsClient(true);
      clearCart();
    }
  }, []);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };
  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isClient && window?.location.href.includes("success")) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <h1>Thanks for your order</h1>
              <p>We will email you details about your orders</p>
            </WhiteBox>
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
          <WhiteBox>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your Cart is Empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {products.map((product) => (
                    <tr key={""}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>

                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </WhiteBox>
          {!!cartProducts?.length && (
            <WhiteBox>
              <h2>Order Information</h2>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal code"
                  name="postalCode"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>

              <Input
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                name="country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
              />
              {/* <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              /> */}
              <Button black block onClick={goToPayment}>
                continue to payment
              </Button>
            </WhiteBox>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
