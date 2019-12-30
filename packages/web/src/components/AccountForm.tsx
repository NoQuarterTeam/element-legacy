import React from "react"
import { Flex, Text } from "@chakra-ui/core"
import { Form } from "./Form"
import { CInput } from "./CInput"
import { useForm } from "../lib/hooks/useForm"
import * as Yup from "yup"
import {
  UpdateInput,
  useUpdateUserMutation,
  UserFragment,
} from "../lib/graphql/types"
import { useToast } from "../lib/hooks/useToast"
import { CButton } from "./CButton"

const AccountSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string()
    .email()
    .required("Required"),
})

interface Props {
  user: UserFragment
}

export const AccountForm = ({ user }: Props) => {
  const defaultValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  }
  const form = useForm({ validationSchema: AccountSchema, defaultValues })
  const toast = useToast()
  const [updateUser] = useUpdateUserMutation()

  const onSubmit = async (values: UpdateInput) => {
    const res = await updateUser({
      variables: { data: values },
    })
    form.handler(res, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Account updated",
          status: "success",
        })
      },
    })
  }

  return (
    <Form onSubmit={onSubmit} {...form}>
      <CInput name="firstName" label="First Name" placeholder="Jim" />
      <CInput name="lastName" label="Last Name" placeholder="Sebe" />
      <CInput name="email" label="Email" placeholder="j.sebe@gmail.com" />
      <Flex justify="space-between" align="center" mt={4}>
        <CButton type="submit" isLoading={form.formState.isSubmitting}>
          Update
        </CButton>
        {form.appError && <Text color="red.500">{form.appError}</Text>}
      </Flex>
    </Form>
  )
}
