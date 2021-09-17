import React from "react";
import ProductDetail from "../../components/productDetail";

const Item = ({ product, addToCart }) => {
  return <ProductDetail addToCart={addToCart} product={product} />;
};

Item.getInitialProps = async (ctx) => {
  const res = await fetch(
    `http://localhost:3001/products?name=${ctx.query.slug}`
  );
  const product = await res.json();

  return { product };
};

export default Item;
