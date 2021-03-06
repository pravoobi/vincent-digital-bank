import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { Flex, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import Footer from "./Footer";

const ComponentContainer = ({ children }) => {
  const StickyNav = styled(Flex)`
    z-index: 10;
    top: 0;
    transition: height 0.5s, line-height 0.5s;
  `;

  return (
    <>
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        minWidth="356px"
        width="100%"
        as="nav"
        px={[2, 6, 6]}
        py={1}
        mt={1}
        mx="auto"
      >
        <Flex width="100%" justify="space-between">
          <NextLink href="/" passHref>
            <a>
              <Image
                src="/vincent-logo.png"
                alt="Vincent Bank"
                width="100px"
                height="60px"
              />
            </a>
          </NextLink>

          <HamburgerIcon w={8} h={8} />
        </Flex>
      </StickyNav>
      <Flex as="main" justifyContent="center" flexDirection="column">
        {children}
      </Flex>
      <Footer />
    </>
  );
};
ComponentContainer.propTypes = {
  children: PropTypes.element,
};
ComponentContainer.defaultProps = {
  children: null,
};
export default ComponentContainer;
