import styled from "styled-components";

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
  time {
    font-size: 1rem;

    color: #555;
  }
`;
const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;
const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;
export default function SingleOrder({ line_items, createdAt, ...rest }) {
  const date = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  );
  const formattedDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return (
    <StyledOrder>
      <div>
        <time>{formattedDate}</time>
        <Address>
          {rest.name}
          <br />
          {rest.email}
          {rest.streetAddress}
          <br />
          {rest.postalCode} {rest.city},{rest.country} <br />
        </Address>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow key={item}>
            <span>{item.quantity} x </span> {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
