import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
// @ts-ignore
import { Camera } from "../Camera/index";
import { Box, Button, Image, HStack } from "@chakra-ui/react";

function CameraImage({ setCamImage }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();

  return (
    <Fragment>
      <Box>
        {isCameraOpen && !cardImage && (
          <Camera
            onCapture={(blob) => {
              setCardImage(blob);
              setCamImage(
                new File([blob], "id_image.jpeg", {
                  type: "image/jpeg",
                  lastModified: new Date().getTime(),
                })
              );
            }}
            onClear={() => {
              setCardImage(undefined);
              setCamImage(undefined);
            }}
          />
        )}

        {cardImage && (
          <div>
            <h2>Preview</h2>
            <Image
              src={cardImage && URL.createObjectURL(cardImage)}
              alt="Preview image"
            />
          </div>
        )}

        <HStack spacing={2} my={2}>
          <Button onClick={() => setIsCameraOpen(true)}>Open Camera</Button>
          <Button
            onClick={() => {
              setIsCameraOpen(false);
              setCardImage(undefined);
              setCamImage(undefined);
            }}
          >
            Close Camera
          </Button>
        </HStack>
      </Box>
    </Fragment>
  );
}
CameraImage.propTypes = {
  setCamImage: PropTypes.func,
};
CameraImage.defaultProps = {
  setCamImage: () => {},
};

export default CameraImage;
