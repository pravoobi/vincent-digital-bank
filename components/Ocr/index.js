import React, { useState } from "react";
import PropTypes from "prop-types";
import { createWorker } from "tesseract.js";
import { Button, Box } from "@chakra-ui/react";

function Ocr({ uploadImage, setOCRText }) {
  const [ocr, setOcr] = useState("");
  const [ocrLoading, setOCRLoading] = useState(false);

  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  const doOCR = async () => {
    setOcr("Recognizing...");
    setOCRLoading(true);
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(uploadImage);
    await worker.terminate();
    setOcr(text);
    setOCRText(text);
    setOCRLoading(false);
  };

  return (
    <Box className="Ocr">
      <Button
        onClick={doOCR}
        isLoading={ocrLoading}
        loadingText="Recognizing Text"
      >
        {ocr.length > 0 ? "Text Recognition Complete" : "Recognize Text"}
      </Button>
    </Box>
  );
}
Ocr.propTypes = {
  setOCRText: PropTypes.func,
  uploadImage: PropTypes.func,
};
Ocr.defaultProps = {
  setOCRText: () => {},
  uploadImage: () => {},
};

export default Ocr;
