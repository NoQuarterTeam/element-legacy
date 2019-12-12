import React from "react"
import { Select as ChakraSelect, SelectProps } from "@chakra-ui/core"

interface Props extends SelectProps {}

export const Select: React.FC<Props> = props => {
  return (
    <ChakraSelect
      border="1px solid black"
      selectProps={{ borderRadius: "0", height: "2rem", cursor: "pointer" }}
      {...props}
    >
      {props.children}
    </ChakraSelect>
  )
}
