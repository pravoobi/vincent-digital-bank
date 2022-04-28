import React, { useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FIELDS } from "../../constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function OcrTextModal({ ocrText = "", documentDispatch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedText, setSelectedText] = useState("");
  const [formIndex, setFormIndex] = useState(0);

  const initialState = {
    firstName: "",
    lastName: "",
    houseNumber: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
  };

  useEffect(() => {
    document.addEventListener("mouseup", (event) => {
      if (window.getSelection().toString().length) {
        setSelectedText(window.getSelection().toString());
      }
    });
    return () => window.removeEventListener("mouseup", null);
  });
  const formField = (field) => {
    return (
      <>
        <Box>{field}</Box>
        <Box bgColor="gray.300" h={8} p={2}>
          {selectedText}
        </Box>
      </>
    );
  };

  const reducer = (state, action) => {
    if (action.type === "reset") {
      return initialState;
    }

    const result = { ...state };
    result[action.type] = action.value;
    return result;
  };
  const [stateReducer, dispatch] = useReducer(reducer, initialState);

  const handleDone = () => {
    const newField = FIELDS[formIndex];
    // @ts-ignore
    dispatch({ type: newField, value: selectedText });
    documentDispatch({ type: "FIELDS", value: stateReducer });
    onClose();
  };
  const handleNextButton = () => {
    if (formIndex < FIELDS.length - 1) setFormIndex(formIndex + 1);

    const newField = FIELDS[formIndex];

    if (newField === "state") {
      const state = selectedText.toLocaleLowerCase();
      const capitalizedState = state.charAt(0).toUpperCase() + state.slice(1);
      // @ts-ignore
      dispatch({
        type: newField,
        value: capitalizedState,
      });
      documentDispatch({
        type: "FIELDS",
        value: { ...stateReducer, [newField]: capitalizedState },
      });
    }

    // @ts-ignore
    dispatch({ type: newField, value: window.getSelection().toString() });
    setSelectedText("");
  };

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Fill form from image
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Highlight fields from Document ID</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Flex>
                {formIndex > 0 && (
                  <IconButton
                    aria-label="Previous Field"
                    variant="ghost"
                    size="md"
                    icon={<ChevronLeftIcon h={10} w={10} />}
                    flexBasis={"1%"}
                    alignSelf="center"
                    onClick={() => setFormIndex(formIndex - 1)}
                  />
                )}
                <Box flexBasis={"94%"}>
                  {formField(FIELDS[formIndex])}
                  <Box bgColor="gray.100" p={2}>
                    {ocrText}
                  </Box>
                </Box>
                {formIndex <= FIELDS.length - 1 && (
                  <IconButton
                    aria-label="Next Field"
                    variant="ghost"
                    size="md"
                    icon={<ChevronRightIcon h={10} w={10} />}
                    flexBasis={"3%"}
                    alignSelf="center"
                    onClick={() => handleNextButton()}
                  />
                )}
              </Flex>
            </>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleDone()}>
              Done
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
OcrTextModal.propTypes = {
  ocrText: PropTypes.string,
  documentDispatch: PropTypes.func,
};
OcrTextModal.defaultProps = {
  ocrText: "",
  documentDispatch: () => {},
};
export default OcrTextModal;
