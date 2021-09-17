import { Box, Heading, Text, Button } from "@chakra-ui/react";
import NextImage from "next/image";

import { SEO } from "../components/seo";
import Products from "../components/products";

// This function gets called at build time
export async function getStaticProps() {
  // Call an json-server API endpoint to get products
  const res = await fetch("http://localhost:3001/products");
  const products = await res.json();

  // By returning { props: { products } }, the Home component
  // will receive `products` as a prop at build time
  return {
    props: {
      products,
    },
  };
}

const Home = ({products}) => (
  <>
    <SEO title="Amazin" />

    <Products products={products}/>
  </>
);

export default Home;
