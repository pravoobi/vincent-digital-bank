import React from "react";
import {
  Center,
  Flex,
  Text,
  Divider,
  Link,
  Box,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiTwitter, FiLinkedin, FiYoutube, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <Box bg="gray.600" color="#FFFFFF" marginTop={6} p={2} width="100%">
      <Flex
        justify="space-around"
        py={3}
        flexDirection={["column", "row", "row", "row"]}
      >
        <VStack>
          <NextLink href={"/legal/site-terms"} passHref>
            <Link
              href={"/legal/site-terms"}
              _hover={{ textDecor: "underline" }}
            >
              Site Terms
            </Link>
          </NextLink>
          <NextLink href={"/legal/privacy-policy"} passHref>
            <Link
              href={"/legal/privacy-policy"}
              _hover={{ textDecor: "underline" }}
            >
              Privacy Policy
            </Link>
          </NextLink>
          <NextLink href={"/legal/privacy-notice"} passHref>
            <Link
              href={"/legal/privacy-notice"}
              _hover={{ textDecor: "underline" }}
            >
              Privacy Notice
            </Link>
          </NextLink>
        </VStack>
        <HStack>
          <Flex align="center" my={4} direction="row" mx={"auto"}>
            <Link
              href="https://twitter.com/vincentBank"
              title="Twitter"
              isExternal
            >
              <IconButton
                aria-label="Twitter"
                icon={<FiTwitter />}
                size="lg"
                color="#FFF"
                variant="ghost"
                _hover={{ backgroundColor: "#DDD" }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/vincetBank"
              title="LinkedIn"
              isExternal
            >
              <IconButton
                aria-label="LinkedIn"
                icon={<FiLinkedin />}
                size="lg"
                color={"#FFF"}
                variant="ghost"
                _hover={{ backgroundColor: "#DDD" }}
              />
            </Link>
            <Link
              href="https://www.youtube.com/VincentBank"
              title="YouTube"
              isExternal
            >
              <IconButton
                aria-label="YouTube"
                icon={<FiYoutube />}
                size="lg"
                color={"#FFF"}
                variant="ghost"
                _hover={{ backgroundColor: "#DDD" }}
              />
            </Link>
            <Link href="mailto:info@vincent-bank.com" title="Email" isExternal>
              <IconButton
                aria-label="Email"
                icon={<FiMail />}
                size="lg"
                color={"#FFF"}
                variant="ghost"
                _hover={{ backgroundColor: "#DDD" }}
              />
            </Link>
          </Flex>
        </HStack>
        <VStack>
          <Text as="h4">Please call us</Text>
          <Text as="h5">1800-1234-8970</Text>
        </VStack>
      </Flex>
      <Divider />
      <Center as="small" p={2}>
        Bank products and services are offered by Vincent Bank®. All deposit
        accounts through Vincent Bank brands are FDIC insured through Vincent
        Bank.
      </Center>
      <Flex justify={"center"} width="100%">
        <Text as="small" mt={4}>
          &copy; Copyright 2022 - {"2022"},{" "}
          <Link
            href="https://vincent-bank.com/"
            textDecor="underline"
            isExternal
          >
            Vincent Bank LLC
          </Link>
          . All Rights Reserved.
        </Text>
      </Flex>
    </Box>
  );
};
export default Footer;
