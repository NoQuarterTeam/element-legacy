import React from "react"
import { useFormContext, FormContext } from "react-hook-form"
import { useToast } from "../lib/hooks/useToast"
import { FormProps } from "react-hook-form/dist/contextTypes"

interface FormContainerProps {
  onSubmit: (values: any) => Promise<any> | any
  onBlur?: (values: any) => Promise<any> | any
}

const FormContainer: React.FC<FormContainerProps> = props => {
  const toast = useToast()
  const { handleSubmit } = useFormContext()
  const onSubmit = async (values: any) => {
    try {
      const res = await props.onSubmit(values)
      return res
    } catch {
      toast({
        title: "Network error",
        description: "Have you lost internet connection?",
        status: "error",
      })
    }
  }
  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
      onBlur={handleSubmit(onSubmit)}
    >
      {props.children}
    </form>
  )
}

interface Props<T> extends FormProps<T>, FormContainerProps {}

export function Form<T>({ onSubmit, ...props }: Props<T>) {
  return (
    <FormContext {...props}>
      <FormContainer onSubmit={onSubmit}>{props.children}</FormContainer>
    </FormContext>
  )
}
