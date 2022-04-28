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
  Divider,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setApplicationStep,
  setApplicationData,
} from "../store/actions/applicationAction";
import { useState } from "react";
import CompContainer from "../components/Container";
import { APPLICATION_STEPS } from "./../constants";
import { ACCOUNT_CREATION_COMPLETE_ROUTE } from "./../routes";

export default function SecuritySetupVerification() {
  const [securityWord, setSecurityWord] = useState("");
  const [securityHint, setSecurityHint] = useState("");
  const [otp, setOtp] = useState("");
  const [smsotp, setSmsotp] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSecuritySetupVerificationSubmit = (e) => {
    e.preventDefault();
    dispatch(setApplicationData({ securityWord, securityHint, otp, smsotp }));
    dispatch(setApplicationStep(APPLICATION_STEPS.ACCOUNT_CREATION_COMPLETE));
    router.push(ACCOUNT_CREATION_COMPLETE_ROUTE);
  };

  return (
    <>
      <CompContainer>
        <Container maxW="2xl" centerContent>
          <Box w="600px" overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              Setup your security word and verify OTP
            </Text>

            <form
              action="submit"
              onSubmit={handleSecuritySetupVerificationSubmit}
            >
              <Stack
                maxWidth={600}
                margin="auto"
                spacing={5}
                marginTop={5}
                p={2}
              >
                <FormControl isRequired>
                  <FormLabel htmlFor="securityWord">Security Word</FormLabel>
                  <Input
                    type="securityWord"
                    placeholder="Security Word"
                    aria-label="Security Word"
                    id="securityWord"
                    aria-describedby="securityWord-helper-text"
                    value={securityWord}
                    onChange={({ target }) => setSecurityWord(target.value)}
                  />
                  <FormHelperText id="securityWord-helper-text">
                    Your security word. When you call us we ask this for the
                    identification. Keep this confidential and do not write this
                    any where.
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="securityHint">Security Hint</FormLabel>
                  <Input
                    type="securityHint"
                    placeholder="Security Hint"
                    aria-label="Security Hint"
                    id="securityHint"
                    aria-describedby="securityHint-helper-text"
                    value={securityHint}
                    onChange={({ target }) => setSecurityHint(target.value)}
                  />
                  <FormHelperText id="securityHint-helper-text">
                    Your security hint
                  </FormHelperText>
                </FormControl>
                <Divider />
                <FormControl isRequired>
                  <FormLabel htmlFor="otp">Email One Time Pin (OTP)</FormLabel>
                  <Input
                    type="otp"
                    placeholder="Email One Time Pin"
                    aria-label="Email One Time Pin"
                    id="otp"
                    aria-describedby="otp-helper-text"
                    value={otp}
                    onChange={({ target }) => setOtp(target.value)}
                  />
                  <FormHelperText id="otp-helper-text">
                    Enter your email One Time Pin (OTP)
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="smsotp">SMS One Time Pin (OTP)</FormLabel>
                  <Input
                    type="smsotp"
                    placeholder="SMS One Time Pin"
                    aria-label="SMS One Time Pin"
                    id="smsotp"
                    aria-describedby="smsotp-helper-text"
                    value={smsotp}
                    onChange={({ target }) => setSmsotp(target.value)}
                  />
                  <FormHelperText id="smsotp-helper-text">
                    Enter your SMS One Time Pin (OTP)
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
                  Continue
                </Button>
              </Stack>
            </form>
          </Box>
        </Container>
      </CompContainer>
    </>
  );
}
