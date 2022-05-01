import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

import ComponentContainer from "../components/ComponentContainer";

export default function ApplicationDeclined() {
  return (
    <>
      <ComponentContainer>
        <Container maxW="2xl" centerContent>
          <Box w="700px" overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              We are sorry
            </Text>
            <Text>
              Your application has been declined, please call us at
              1800-3489-2348
            </Text>
            <Text>
              Application Id:<strong>45728384823488</strong>
            </Text>
          </Box>
        </Container>
      </ComponentContainer>
    </>
  );
}
