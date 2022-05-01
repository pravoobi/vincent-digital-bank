import React from "react";
import {
  Box,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import ComponentContainer from "../components/ComponentContainer";
import useWindowSize from "../utils/useWindowSize";

export default function Dashboard() {
  // @ts-ignore
  const applicationData = useSelector((state) => state.application);
  const { firstName = "John" } = applicationData || {};

  const { width } = useWindowSize();

  return (
    <>
      <ComponentContainer>
        <Container maxW="2xl" centerContent>
          <Box maxWidth={700} overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              {firstName}, Welcome!
            </Text>
            <Text p={2} my={3} bg="blue.100" borderRadius={5}>
              <InfoIcon w={5} h={5} color="blue.900" /> Link to External
              Accounts to transfer
            </Text>
            <Text p={2} my={3} bg="blue.100" borderRadius={5}>
              <InfoIcon w={5} h={5} color="blue.900" /> Fund your Account now
            </Text>
            <TableContainer color={"blue.300"} my={5}>
              <Table
                variant="simple"
                colorScheme="facebook"
                size={width < 500 ? "sm" : "md"}
              >
                <Thead>
                  <Tr>
                    <Th>Account</Th>
                    <Th isNumeric>Rate</Th>
                    <Th isNumeric>Balance</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Savers Account - 3478</Td>
                    <Td isNumeric>0.80% APY</Td>
                    <Td isNumeric>$ 0.00</Td>
                  </Tr>
                  {/* <Tr>
                    <Td>High Yield - 8970</Td>
                    <Td isNumeric>1.00% APY</Td>
                    <Td isNumeric>$3000.48</Td>
                  </Tr>
                  <Tr>
                    <Td>High Yield - 8990</Td>
                    <Td isNumeric>1.00% APY</Td>
                    <Td isNumeric>$3456.00</Td>
                  </Tr> */}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </ComponentContainer>
    </>
  );
}
