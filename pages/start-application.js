import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Input,
  Stack,
  InputGroup,
  FormControl,
  FormHelperText,
  Text,
  FormLabel,
  InputRightElement,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setApplicationStep,
  setApplicationData,
} from "../store/actions/applicationAction";
import { useState } from "react";
import CompContainer from "../components/container";
import { APPLICATION_STEPS, CONSENTS } from "./../constants";
import { DOCUMENT_ID_UPLOAD_ROUTE } from "./../routes";

export default function StartApplication() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [consents, setConsents] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  // const sampleListData = useSelector((state) => state.sampleData);
  // useEffect(() => {
  //   dispatch(getSampleData());
  // }, [dispatch]);
  const handleConsents = (target) => {
    if (target.checked) {
      setConsents([
        { consent: CONSENTS.PRIVACY_POLICY, accepted: true },
        { consent: CONSENTS.PRIVACY_NOTICE, accepted: true },
      ]);
    }
  };

  const handleStartApplicationSubmit = (e) => {
    e.preventDefault();
    dispatch(setApplicationData({ email: emailAddress, password, consents }));
    dispatch(setApplicationStep(APPLICATION_STEPS.DOCUMENT_UPLOAD));
    router.push(DOCUMENT_ID_UPLOAD_ROUTE);
  };

  return (
    <>
      <CompContainer>
        <Container maxW="2xl" centerContent>
          <Box w="600px" overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              Let`&apos;`s start your application
            </Text>

            <form action="submit" onSubmit={handleStartApplicationSubmit}>
              <Stack
                maxWidth={600}
                margin="auto"
                spacing={5}
                marginTop={5}
                p={2}
              >
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    id="email"
                    aria-describedby="email-helper-text"
                    value={emailAddress}
                    onChange={({ target }) => setEmailAddress(target.value)}
                  />
                  <FormHelperText id="email-helper-text">
                    Your user account email address
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      aria-label="Password"
                      id="password"
                      aria-labelledby="password-helper-text"
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        height="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText id="password-helper-text">
                    Your user account Password
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="confirm-password">
                    Confirm Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    aria-label="Password"
                    id="confirm-password"
                    aria-labelledby="confirm-password-helper-text"
                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value)}
                  />
                  <FormHelperText id="confirm-password-helper-text">
                    Retype your user account Password
                  </FormHelperText>
                  {password !== "" &&
                    confirmPassword !== "" &&
                    password === confirmPassword && (
                      <Text>Password and Confirm Passwords do not match.</Text>
                    )}
                </FormControl>

                <FormControl isRequired>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    aria-label="Consent checkbox"
                    onChange={({ target }) => handleConsents(target)}
                  >
                    I agree to Privacy policy and Privacy Notice.
                  </Checkbox>
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
