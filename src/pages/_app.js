import React, { useState, useEffect } from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/layout";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

const theme = extendTheme({
  fonts: {
    body: "Poppins, -apple-system",
    heading: "Poppins, -apple-system",
  },
});

const MyApp = ({ Component, pageProps }) => {
  //Ensure localStorage is only read once on initial load
  const [cart, setCart] = useState(() => {
    //try catch acts as fallback if cart data is malformed or
    //cant be fetched from localstorage by returning an empty Array instead
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("The cart couldn't be parsed into JSON");
      return [];
    }
  });

  //Persist cart items by storing cart Array in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Registering a service worker for the site
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  const addToCart = (name, currency) => {
    setCart((items) => {
      const itemInCart = items.find((i) => i.name === name);
      if (itemInCart) {
        //Return a new array with the matching item replaced
        return items.map((i) => (i.name === name ? { ...i } : i));
      } else {
        //Return a new array with new item appended
        return [...items, { name, quantity: 1, currency }];
      }
    });
  };

  const deleteItem = (name) => {
    setCart((items) => {
      //return items that dont match the passed name
      return items.filter((i) => i.name !== name);
    });
  };

  const updateQuantity = (name, quantity) => {
    setCart((items) => {
      return items.map((i) =>
        i.name === name ? { ...i, quantity: quantity } : i
      );
    });
  };
  return (
    <>
      {/* chakra-ui context provider */}
      <ChakraProvider theme={theme}>
        <Layout>
          <Component
            updateQuantity={updateQuantity}
            addToCart={addToCart}
            deleteItem={deleteItem}
            cart={cart}
            {...pageProps}
          />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
