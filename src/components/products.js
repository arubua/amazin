import React from "react";
import { Flex, Image, Center, Box, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { getImageUrl } from "./getImageUrl";

const Products = (props) => {
  const { products } = props;

  return (
    <Flex wrap="wrap">
      {products
        ? products.map((product) =>
            product.available_quantity > 0 ? (
              <Link
                href={{
                  pathname: "/products/[slug]",
                  query: { slug: product.name },
                }}
                key={product.name}
              >
                <Box
                  _hover={{
                    boxShadow: "2xl",
                    cursor: "pointer",
                  }}
                  maxW="300px"
                  m="2em"
                  pt="1em"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Center>
                    <Image
                      src={getImageUrl(product.image_url)}
                      alt={product.name}
                    />
                  </Center>
                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        New
                      </Badge>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {product.name}-{product.description}
                    </Box>

                    <Box>
                      <Box as="span" color="gray.600" fontSize="sm">
                        KES{" "}
                      </Box>
                      {product.prices[1].price}
                    </Box>

                    <Box d="flex" mt="2" alignItems="center">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < product.rating ? "teal.500" : "gray.300"}
                          />
                        ))}
                      <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        0 reviews
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            ) : (
              <Box
                _hover={{
                  boxShadow: "md",
                  cursor: "pointer",
                }}
                maxW="300px"
                m="2em"
                pt="1em"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                key={product.name}
              >
                <Center>
                  <Image
                    src={getImageUrl(product.image_url)}
                    alt={product.name}
                  />
                </Center>
                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="red">
                      Coming soon
                    </Badge>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {product.name}-{product.description}
                  </Box>

                  <Box>
                    <Box as="span" color="gray.600" fontSize="sm">
                      KES{" "}
                    </Box>
                    {product.prices[1].price}
                  </Box>

                  <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < product.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      0 reviews
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          )
        : null}
    </Flex>
  );
};

export default Products;
