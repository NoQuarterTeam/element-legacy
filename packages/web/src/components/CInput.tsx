import React from "react"
import {
  FormLabel,
  Input,
  InputProps,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/core"
import { useFormContext } from "react-hook-form"

interface Props extends InputProps {
  name: string
  label: string
}

export const CInput = ({ label, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name]
  const error = fieldError?.message || fieldError?.types

  return (
    <FormControl isInvalid={!!error} mb={4}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Input ref={register} mb={0} variant="filled" {...props} />
      {error &&
        (typeof error === "string" ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : (
          Object.values(error).map((message, i) => (
            <FormErrorMessage key={i}>{message}</FormErrorMessage>
          ))
        ))}
    </FormControl>
  )
}
