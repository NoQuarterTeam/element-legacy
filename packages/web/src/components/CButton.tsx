import React from "react"
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/core"

export const CButton: React.FC<ButtonProps> = ({
  variant = "solid",
  bg = "#F4CA87",
  type = "button",
  borderRadius = "0",
  border = "2px",
  px = "10",
  py = "5",
  fontWeight = "normal",
  fontSize = "lg",
  letterSpacing = "wide",
  width = "auto",
  children,
  ...props
}) => {
  return (
    <ChakraButton
      type={type}
      variant={variant}
      bg={bg}
      borderRadius={borderRadius}
      border={border}
      px={px}
      py={py}
      _hover={{ opacity: 0.7 }}
      fontWeight={fontWeight}
      fontSize={fontSize}
      letterSpacing={letterSpacing}
      width={width}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
