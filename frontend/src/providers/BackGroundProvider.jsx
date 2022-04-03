import { useColorModeValue, Box, useColorMode, Image } from "@chakra-ui/react"
import React from "react"
import dark from "../assets/dark.png"
import light from "../assets/lines2.svg"

const BackGroundProvider = (props) => {
  const bgI = useColorModeValue(light, light)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box overflow="hidden" h="100vh">
      <Image
        src={bgI}
        w="100%"
        zIndex="-1"
        position="absolute"
        filter={colorMode === "dark" ? "hueRotate(20deg)" : "hueRotate(0deg)"}
      />
      {props.children}
    </Box>
  )
}

export default BackGroundProvider
