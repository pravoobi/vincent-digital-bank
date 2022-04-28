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
import { useSelector } from "react-redux";
import ComponentContainer from "../components/ComponentContainer";

export default function Dashboard() {
  // @ts-ignore
  const applicationData = useSelector((state) => state.application);
  const { firstName = "John" } = applicationData || {};

  return (
    <>
      <ComponentContainer>
        <Container maxW="2xl" centerContent>
          <Box w="600px" overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              {firstName}, Welcome!
            </Text>
            <Text></Text>
            <TableContainer>
              <Table variant="simple">
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
                    <Td isNumeric>$ 1200.00</Td>
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
