import React from "react";
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Center,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getImageUrl } from "../components/getImageUrl";

const Cart = (props) => {
  const { cart } = props;
  const { products } = props;
  console.log(products);
  const { updateQuantity } = props;
  const { deleteItem } = props;

  const renderItem = (itemInCart) => {
    console.log(itemInCart);
    const { name, quantity, currency } = itemInCart;
    const { prices, image_url, available_quantity } = products.find(
      (p) => p.name === name
    );

    return (
      <Tr key={name}>
        <Td>
          <HStack>
            <Box>
              <Image alt={name} w="80px" src={getImageUrl(image_url)} />
            </Box>
            <Box>
              <Text>{name}</Text>
            </Box>
          </HStack>
        </Td>
        <Td>
          <VStack>
            <Box>
              <NumberInput
                w="100px"
                defaultValue={quantity}
                inputMode="numeric"
                min={1}
                max={available_quantity}
                onChange={(e) => {
                  updateQuantity(name, e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box pt="0.5em" fontSize="sm" color="gray.400">
              Only {available_quantity - quantity} remaining
            </Box>
          </VStack>
        </Td>

        {prices.map((price) => {
          if (price.currency == currency) {
            const actualPrice = parseInt(price.price);
            return (
              <>
                <Td key={price.currency}>
                  <Text>
                    {price.currency} {price.price}{" "}
                  </Text>
                </Td>
                <Td key={price.price} fontWeight="600">
                  {price.currency} {actualPrice * quantity}
                </Td>
              </>
            );
          }
        })}

        <Td>
          <Center h="130px" ml=".4em">
            <IconButton
              colorScheme="red"
              aria-label="delete"
              size="xs"
              mt="0"
              icon={<DeleteIcon />}
              onClick={(e) => deleteItem(name)}
            />
          </Center>
        </Td>
      </Tr>
    );
  };

  const numItemsInCart = cart.reduce((total, item) => total + 1, 0);

  return (
    <Box as="section">
      <Box p="1em">
        <HStack>
          <Text fontSize="2xl" fontWeight="regular">
            {numItemsInCart}
          </Text>
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 64 64"
            >
              <path
                d="M61.063 2H58.25v.896c-3.916.876-4.479 4.511-4.7 5.9c-.105.657-.318 1.942-.582 3.516H3.988c-1.938 0-2.155 1.811-1.902 2.813l5.746 25.367c.252 1.002 1.313 1.82 2.353 1.82h42.944c1.034 0 1.877.841 1.877 1.875s-.843 1.875-1.877 1.875H6.255a1.874 1.874 0 1 0 0 3.75h2.43a7.494 7.494 0 0 0-3.872 6.563h1.875c0 3.105 2.52 5.625 5.625 5.625s5.625-2.52 5.625-5.625h1.875a7.495 7.495 0 0 0-3.873-6.563h26.494a7.495 7.495 0 0 0-3.873 6.563h1.875a5.627 5.627 0 0 0 11.252 0h1.875a7.497 7.497 0 0 0-3.872-6.563h3.44a5.628 5.628 0 0 0 5.625-5.625a5.626 5.626 0 0 0-5.627-5.625h-.697l2.398-14.91c.668-3.938 2.108-12.445 2.446-14.561c.17-1.069.335-1.82.974-2.241v.774h2.813A.94.94 0 0 0 62 6.688v-3.75A.94.94 0 0 0 61.063 2m-48.75 57.188A2.816 2.816 0 0 1 9.5 56.375h5.625a2.816 2.816 0 0 1-2.812 2.813m33.75 0a2.816 2.816 0 0 1-2.814-2.813h5.627a2.818 2.818 0 0 1-2.813 2.813m-2.307-42.194a1.07 1.07 0 0 1 1.04-.932h5.937c.516 0 .875.416.794.927l-.588 3.771c-.078.51-.567.927-1.084.927h-5.663a.826.826 0 0 1-.841-.932l.405-3.761m-1.009 9.375a1.073 1.073 0 0 1 1.04-.932h5.483c.517 0 .875.416.797.927l-.443 2.834c-.079.51-.567.927-1.084.927h-5.257a.828.828 0 0 1-.841-.932l.305-2.824M6.866 20.777l-.95-3.805c-.124-.502.198-.91.715-.91h7.059c.518 0 .985.419 1.04.932l.404 3.762a.828.828 0 0 1-.84.932H8.033c-.516 0-1.042-.411-1.167-.911m3.271 9.348c-.516 0-1.042-.41-1.166-.91l-.716-2.867c-.125-.502.195-.91.712-.91h5.729c.517 0 .985.419 1.04.932l.304 2.824a.827.827 0 0 1-.84.932h-5.063zm5.969 8.438h-3.865c-.519 0-1.042-.41-1.167-.91l-.716-2.867c-.124-.502.196-.91.714-.91h4.53c.517 0 .985.419 1.042.932l.302 2.824a.826.826 0 0 1-.84.931m11.492-.938a.942.942 0 0 1-.94.938h-4.891a1.07 1.07 0 0 1-1.039-.932l-.304-2.824a.825.825 0 0 1 .839-.932h5.395a.94.94 0 0 1 .94.938v2.812m0-8.437a.942.942 0 0 1-.94.938H20.86c-.516 0-.982-.419-1.04-.932l-.302-2.824a.826.826 0 0 1 .839-.932h6.301a.94.94 0 0 1 .94.938v2.812m0-8.438a.942.942 0 0 1-.94.938h-6.702a1.07 1.07 0 0 1-1.04-.932l-.404-3.762a.827.827 0 0 1 .84-.932h7.307a.94.94 0 0 1 .94.938v3.75zm10.159 16.881a1.071 1.071 0 0 1-1.04.932h-4.42a.941.941 0 0 1-.939-.938v-2.813a.94.94 0 0 1 .939-.938h4.924c.516 0 .896.419.84.932l-.304 2.825m.906-8.438a1.071 1.071 0 0 1-1.04.932h-5.326a.941.941 0 0 1-.939-.938v-2.813a.94.94 0 0 1 .939-.938h5.83c.517 0 .896.419.839.932l-.303 2.825m.906-8.437a1.071 1.071 0 0 1-1.04.932h-6.232a.941.941 0 0 1-.939-.938V17a.94.94 0 0 1 .939-.938h6.837c.517 0 .896.419.841.932l-.406 3.762m7.232 17.807v-.007l-.008.007H42.377c-.029 0-.054-.014-.083-.018c-.005-.034-.005-.068-.011-.104l-.044.092a.402.402 0 0 0 .037.008c-.461-.053-.791-.434-.738-.91l.302-2.824a1.073 1.073 0 0 1 1.04-.932h5.076c.517 0 .873.416.795.927l-.443 2.834c-.077.51-.565.927-1.082.927h-.425"
                fill="#38b2ac"
              />
            </svg>
          </Box>
        </HStack>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center">Product Details</Th>
            <Th textAlign="center">Quantity</Th>
            <Th textAlign="center">Price</Th>
            <Th textAlign="center">Sub Total</Th>
            <Th textAlign="center">Delete</Th>
          </Tr>
        </Thead>
        <Tbody>{cart.map(renderItem)}</Tbody>
      </Table>
    </Box>
  );
};

// This function gets called at build time
export async function getStaticProps() {
  // Call an json-server API endpoint to get products
  const res = await fetch("http://localhost:3001/products/");
  const products = await res.json();

  // By returning { props: { products } }, the Home component
  // will receive `products` as a prop at build time
  return {
    props: {
      products,
    },
  };
}

export default Cart;
