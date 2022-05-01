import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  FormControl,
  FormHelperText,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setApplicationStep,
  setApplicationData,
} from "../store/actions/applicationAction";
import { useEffect, useState } from "react";
import ComponentContainer from "../components/ComponentContainer";
import { APPLICATION_STEPS } from "./../constants";
import { DASHBOARD } from "./../routes";
import Confetti from "react-confetti";
import useWindowSize from "../utils/useWindowSize";

export default function AccountCreationComplete() {
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [isConfettiShown, setConfettiShown] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setConfettiShown(false);
    }, 10000);
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleAccountCreationCompleteSubmit = (e) => {
    e.preventDefault();
    dispatch(setApplicationData({ accountNumber, routingNumber }));
    dispatch(setApplicationStep(APPLICATION_STEPS.DASHBOARD));
    router.push(DASHBOARD);
  };

  const { width, height } = useWindowSize();

  return (
    <>
      {isConfettiShown && width && height && (
        <Confetti width={width} height={height} />
      )}
      <ComponentContainer>
        <Container maxW="2xl" centerContent>
          <Box w="700px" overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              Congratulations! on your account opening
            </Text>
            <Text>
              You can link your external accounts and transfer funds to the new
              account!
            </Text>

            <form
              action="submit"
              onSubmit={handleAccountCreationCompleteSubmit}
            >
              <Stack
                maxWidth={700}
                margin="auto"
                spacing={5}
                marginTop={5}
                p={2}
              >
                <FormControl isRequired>
                  <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
                  <Input
                    type="accountNumber"
                    placeholder="AccountNumber"
                    aria-label="AccountNumber"
                    id="accountNumber"
                    aria-describedby="accountNumber-helper-text"
                    value={accountNumber}
                    onChange={({ target }) => setAccountNumber(target.value)}
                  />
                  <FormHelperText id="accountNumber-helper-text">
                    Your External Bank Account number
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="routingNumber">Routing Number</FormLabel>
                  <Input
                    type="routingNumber"
                    placeholder="RoutingNumber"
                    aria-label="RoutingNumber"
                    id="routingNumber"
                    aria-describedby="routingNumber-helper-text"
                    value={routingNumber}
                    onChange={({ target }) => setRoutingNumber(target.value)}
                  />
                  <FormHelperText id="routingNumber-helper-text">
                    Your External Bank Routing number
                  </FormHelperText>
                </FormControl>

                <Button
                  variant="solid"
                  colorScheme="blue"
                  type="submit"
                  boxShadow="sm"
                  size="md"
                  width="150px"
                  _hover={{ boxShadow: "md" }}
                  _active={{ boxShadow: "lg" }}
                  mt="4"
                >
                  Link
                </Button>
              </Stack>
            </form>
          </Box>
        </Container>
      </ComponentContainer>
    </>
  );
}
