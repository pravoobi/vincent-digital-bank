import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  FormControl,
  Text,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setApplicationStep,
  setApplicationData,
} from "../store/actions/applicationAction";
import { useState } from "react";
import ComponentContainer from "../components/ComponentContainer";
import { APPLICATION_STEPS, COUNTRIES, OCCUPATIONS } from "./../constants";
import { SECURITY_SETUP_VERIFICATION_ROUTE } from "./../routes";

export default function PersonalInformation() {
  const [phone, setPhone] = useState("");
  const [ssn, setSSN] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [occupation, setOccupation] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handlePersonalInformationSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setApplicationData({
        citizenship,
        phone,
        ssn,
        occupation,
      })
    );
    dispatch(setApplicationStep(APPLICATION_STEPS.SECURITY_SETUP_VERIFICATION));
    router.push(SECURITY_SETUP_VERIFICATION_ROUTE);
  };

  return (
    <>
      <ComponentContainer>
        <Container maxW="2xl" centerContent>
          <Box w="700px" overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              Tell us more about you
            </Text>

            <form action="submit" onSubmit={handlePersonalInformationSubmit}>
              <Stack
                maxWidth={700}
                margin="auto"
                spacing={5}
                marginTop={5}
                p={2}
              >
                <FormControl isRequired>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    type="phone"
                    placeholder="Phone"
                    aria-label="Phone"
                    id="phone"
                    aria-describedby="phone-helper-text"
                    value={phone}
                    onChange={({ target }) => setPhone(target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="ssn">SSN</FormLabel>
                  <Input
                    type="ssn"
                    placeholder="SSN"
                    aria-label="SSN"
                    id="ssn"
                    aria-describedby="ssn-helper-text"
                    value={ssn}
                    onChange={({ target }) => setSSN(target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="citizenship">Citizenship</FormLabel>
                  <Select
                    placeholder="Select option"
                    onChange={({ target }) => setCitizenship(target.value)}
                  >
                    {COUNTRIES.map(({ code, name }) => (
                      <option key={code} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="occupation">Occupation</FormLabel>
                  <Select
                    placeholder="Select option"
                    onChange={({ target }) => setOccupation(target.value)}
                  >
                    {OCCUPATIONS.map(({ OccupationId, OccupationName }) => (
                      <option key={OccupationId} value={OccupationName}>
                        {OccupationName}
                      </option>
                    ))}
                  </Select>
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
      </ComponentContainer>
    </>
  );
}
