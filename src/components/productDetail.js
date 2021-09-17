import React, { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { getImageUrl } from "./getImageUrl";

import {
  Box,
  Flex,
  Badge,
  Image,
  Center,
  Button,
  Input,
  Select,
  HStack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import router from "next/router";

const ProductDetail = (props) => {
  console.log(props);
  const { product } = props;
  const [currency, setCurrency] = useState("KES");

  const item = product[0];

  return (
    <Center>
      <Flex wrap="wrap">
        <Center m="1.5em" minW="270px">
          <Image alt={item.name} src={getImageUrl(item.image_url)} />
        </Center>

        <Box m="1em" maxW="500px">
          <Box
            pb=".2em"
            fontWeight="semibold"
            fontSize="2xl"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {item.name.toUpperCase()}
          </Box>
          <Box d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
          </Box>

          <Box pt=".5em" fontWeight="light" as="p" lineHeight="tight">
            {item.description}
          </Box>

          <Box pt=".8em">
            <Box as="span" fontWeight="bold" fontSize="xl">
              <HStack>
                {item.prices.map((price) => {
                  if (price.currency == currency) {
                    return (
                      <Text key={price.currency}>
                        {price.currency} {price.price}{" "}
                      </Text>
                    );
                  }
                })}
                <Spacer />
                <Select
                  onChange={(e) => setCurrency(e.target.value)}
                  size="sm"
                  w="90px"
                  value={currency}
                >
                  <option value="KES">KES</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="NGN">NGN</option>
                </Select>
              </HStack>
            </Box>
          </Box>

          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < item.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              0 reviews
            </Box>
          </Box>

          <Box mt="0.5em">
            <Button
              onClick={() => {
                props.addToCart(item.name, currency);
                console.log(item.name);
                router.push("/cart");
              }}
              mr="0.5em"
              w="xs"
              colorScheme="teal"
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Flex>
    </Center>
  );
};

export default ProductDetail;
