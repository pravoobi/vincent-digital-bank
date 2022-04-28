import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageUpload from "image-upload-react";
import { DeleteIcon } from "@chakra-ui/icons";

function ImageUploadComponent({ setUploadImage }) {
  const [imageSrc, setImageSrc] = useState();

  const handleImageSelect = (e) => {
    // @ts-ignore
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setUploadImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <ImageUpload
      handleImageSelect={handleImageSelect}
      imageSrc={imageSrc}
      setImageSrc={setImageSrc}
      defaultDeleteIconSize={60}
      defaultDeleteIconColor="#F00"
      deleteIcon={<DeleteIcon color="red.500" />}
      style={{
        width: 500,
        height: 400,
        background: "gray",
      }}
    />
  );
}
ImageUploadComponent.propTypes = {
  setUploadImage: PropTypes.func,
};
ImageUploadComponent.defaultProps = {
  setUploadImage: () => {},
};

export default ImageUploadComponent;
