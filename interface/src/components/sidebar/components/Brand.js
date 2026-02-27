import React from "react";

// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Box fontSize='30px' fontWeight='bold'>HRMS</Box>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
