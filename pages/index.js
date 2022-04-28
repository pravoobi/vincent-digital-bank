import React from "react";
import { useRouter } from "next/router";
import { Button, Box, Text, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { ChevronRightIcon } from "@chakra-ui/icons";

import CompContainer from "../components/Container";
import { START_APPLICATION_ROUTE } from "./../routes";
import { APPLICATION_STEPS } from "./../constants";
import { setApplicationStep } from "../store/actions/applicationAction";

export default function Home() {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setApplicationStep(APPLICATION_STEPS.DOCUMENT_UPLOAD));
    router.push(START_APPLICATION_ROUTE);
  };
  const BackgroundImg = styled("div")`
    height: calc(100vh - 68px);
    position: relative;
    background-size: cover;
    background-image: url("./CityView.jpg");
    background-color: #ddd;
  `;

  return (
    <>
      <CompContainer>
        <Box>
          <BackgroundImg>
            <Box w="100%" display="flex">
              <Box
                mt={100}
                ml={100}
                w="45%"
                p={8}
                bgColor="gray.50"
                opacity="1"
                color="blue.900"
              >
                <Text as="h1" fontSize="5xl" my={3}>
                  Savings Accounts
                </Text>
                <Text as="h4" fontSize="xl" my={3}>
                  Save smarter, compound faster. This is savings, evolved.
                </Text>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  size="lg"
                  width="250px"
                  onClick={handleClick}
                  borderRadius="100px"
                  rightIcon={<ChevronRightIcon w={8} h={8} />}
                  _hover={{ transform: "scale(1.03)" }}
                  mt={5}
                >
                  Open an Account
                </Button>
              </Box>
            </Box>
          </BackgroundImg>
          <Box
            w="100%"
            display="flex"
            bgColor="blue.900"
            color="gray.50"
            p={10}
          >
            <Box flexDirection="column" display="flex" flexBasis={"30%"} ml={3}>
              <Box>Earn upto</Box>
              <Box fontSize="6xl" display="flex">
                <Box as="span">{">"}</Box> <Box> 0.80</Box>
                <Box as="span" fontSize="md" mt={6} mx={3}>
                  <Box>%</Box>
                  <Box as="span">APY</Box>
                </Box>
              </Box>
            </Box>
            <Box p={3} ml={5} flexBasis={"50%"}>
              At Vincent Bank, we liberate customers from the constraints of
              traditional banking. Because we `&apos` re digital, our overhead
              costs are lower than traditional banks. Smarter savings means more
              money for you.
            </Box>
          </Box>
          <Flex>
            <Flex flexDirection="column" p={5} flexBasis={"33%"}>
              <Text as="h3" fontSize="3xl" p={2}>
                High Yield Savings
              </Text>
              <Text>
                Up to 0.61% APY. Grow your savings faster with interest
                compounded daily. No monthly maintenance fees. No minimum
                balance requirements. Plus a free ATM card upon request.
              </Text>
            </Flex>
            <Flex flexDirection="column" p={8} flexBasis={"33%"}>
              <Text as="h3" fontSize="3xl" p={2}>
                Certificates of Deposit (CDs)
              </Text>
              <Text>
                Higher returns, zero risk. With a $1,000 minimum deposit, you
                can choose terms between 3 and 60 months. All CDs are
                FDIC-insured to the maximum allowable limits.
              </Text>
            </Flex>
            <Flex flexDirection="column" p={5} flexBasis={"33%"}>
              <Text as="h3" fontSize="3xl" p={2}>
                High Yield Money Market
              </Text>
              <Text>
                0.25% APY. Get the security of traditional savings with higher
                interest rates and limited check-writing privileges. No monthly
                maintenance fees. No minimum balance requirements. Interest
                compounded daily.
              </Text>
            </Flex>
          </Flex>
        </Box>
      </CompContainer>
    </>
  );
}
