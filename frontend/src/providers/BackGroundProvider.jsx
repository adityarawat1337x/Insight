import { useColorModeValue, Box } from "@chakra-ui/react"
import React from "react"
import dark from "../assets/dark.jpg"
import light from "../assets/light.jpg"

const BackGroundProvider = (props) => {
  const bgI = useColorModeValue(light, dark)
  return (
    <Box overflow="hidden" h="100vh" backgroundImage={bgI}>
      {props.children}
    </Box>
  )
}

export default BackGroundProvider
