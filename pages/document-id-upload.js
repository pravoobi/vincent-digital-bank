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
  Radio,
  RadioGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  HStack,
  Select,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setApplicationStep,
  setApplicationData,
} from "../store/actions/applicationAction";
import { useReducer, useState } from "react";
import CompContainer from "../components/Container";
import { APPLICATION_STEPS, US_STATES } from "./../constants";
import { PERSONAL_INFORMATION_ROUTE } from "./../routes";
import CameraImage from "../components/CameraImage";
import ImageUploadComponent from "../components/ImageUpload";
import Ocr from "../components/Ocr";
import OcrTextModal from "../components/Modal/OcrTextModal";

export default function DocumentIdUpload() {
  const [idTypeValue, setIdTypeValue] = useState("");
  const [uploadImage, setUploadImage] = useState();
  const [camImage, setCamImage] = useState();
  const [ocrText, setOCRText] = useState("");

  const initialState = {
    firstName: "",
    lastName: "",
    houseNumber: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
  };

  const reducer = (state, action) => {
    if (action.type === "reset") {
      return initialState;
    }
    if (action.type === "FIELDS") {
      return { ...action.value };
    }

    const result = { ...state };
    result[action.type] = action.value;
    console.log(action);
    return result;
  };
  const [stateReducer, dispatch] = useReducer(reducer, initialState);

  const {
    firstName = "",
    lastName = "",
    houseNumber = "",
    street = "",
    city = "",
    zipCode = "",
    state = "",
  } = stateReducer;

  const reduxDispatch = useDispatch();
  const router = useRouter();

  const handleDocumentIdUploadSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(
      setApplicationData({
        firstName,
        lastName,
        houseNumber,
        street,
        city,
        state,
        zipCode,
      })
    );
    reduxDispatch(
      setApplicationStep(APPLICATION_STEPS.PERSONAL_INFORMATION_ROUTE)
    );
    router.push(PERSONAL_INFORMATION_ROUTE);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    // @ts-ignore
    dispatch({ type: name, value });
  };

  return (
    <>
      <CompContainer>
        <Container maxW="2xl" centerContent>
          <Box w="600px" overflow="hidden" alignItems="center">
            <Text as="h1" fontWeight="bold" fontSize="5xl" my={3}>
              Upload your document ID
            </Text>

            <form action="submit" onSubmit={handleDocumentIdUploadSubmit}>
              <Stack
                maxWidth={600}
                margin="auto"
                spacing={5}
                marginTop={5}
                p={2}
              >
                <FormControl isRequired>
                  <FormLabel htmlFor="email">
                    Select your ID type to Upload
                  </FormLabel>
                  <RadioGroup onChange={setIdTypeValue} value={idTypeValue}>
                    <Stack direction="row" ml={2} my={2} spacing={2}>
                      <Radio value="drivingLicense">Driving License</Radio>
                      <Radio value="StateId">State ID</Radio>
                      <Radio value="passport">Passport</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormHelperText id="email-helper-text">
                    Your document ID type to upload
                  </FormHelperText>
                </FormControl>
                <Text as={"h3"} fontWeight="bold">
                  Document ID capture/upload
                </Text>
                <Tabs isFitted variant="enclosed" mt={2}>
                  <TabList mb="1em">
                    <Tab>Capture ID with Camera</Tab>
                    <Tab>Upload ID image</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CameraImage setCamImage={setCamImage} />
                    </TabPanel>
                    <TabPanel>
                      <ImageUploadComponent setUploadImage={setUploadImage} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                <Ocr
                  setOCRText={setOCRText}
                  uploadImage={uploadImage || camImage}
                />
                <OcrTextModal ocrText={ocrText} documentDispatch={dispatch} />
                <FormControl isRequired>
                  <FormLabel htmlFor="fname">First Name</FormLabel>
                  <Input
                    type="fname"
                    name="firstName"
                    placeholder="First Name"
                    aria-label="First Name"
                    id="fname"
                    aria-describedby="fname-helper-text"
                    value={firstName}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="lname">Last Name</FormLabel>
                  <Input
                    type="lname"
                    name="lastName"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    id="lname"
                    aria-describedby="lname-helper-text"
                    value={lastName}
                    onChange={onChange}
                  />
                </FormControl>
                <Divider />
                <HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="houseNo">House Number</FormLabel>
                    <Input
                      type="houseNo"
                      name="houseNumber"
                      placeholder="House Number"
                      aria-label="House Number"
                      id="houseNo"
                      aria-describedby="houseNo-helper-text"
                      value={houseNumber}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="street">Street</FormLabel>
                    <Input
                      type="street"
                      name="street"
                      placeholder="Street"
                      aria-label="Street"
                      id="street"
                      aria-describedby="street-helper-text"
                      value={street}
                      onChange={onChange}
                    />
                  </FormControl>
                </HStack>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      type="city"
                      name="city"
                      placeholder="City"
                      aria-label="city"
                      id="city"
                      aria-describedby="city-helper-text"
                      value={city}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                    <Input
                      type="zipcode"
                      placeholder="zipCode"
                      aria-label="zipCode"
                      id="zipCode"
                      aria-describedby="zipCode-helper-text"
                      value={zipCode}
                      onChange={onChange}
                      name="zipCode"
                    />
                  </FormControl>
                </HStack>
                <FormControl isRequired>
                  <FormLabel htmlFor="state">State</FormLabel>
                  <Select
                    placeholder="Select option"
                    onChange={onChange}
                    name="state"
                    value={
                      state.charAt(0).toUpperCase() +
                      state.slice(1).toLowerCase()
                    }
                  >
                    {US_STATES.map(({ code, name }) => (
                      <option key={code} value={name}>
                        {name}
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
      </CompContainer>
    </>
  );
}
