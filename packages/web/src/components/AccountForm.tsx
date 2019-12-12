import React, { FC } from "react"
import { Flex, Button, Text } from "@chakra-ui/core"
import { Form } from "./Form"
import { CInput } from "./CInput"
import { useForm } from "../lib/hooks/useForm"
import * as Yup from "yup"
import {
  UpdateInput,
  MeQuery,
  MeDocument,
  useUpdateUserMutation,
} from "../lib/graphql/types"
// import { useApolloClient } from "react-apollo-hooks"

const AccountSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
})

const AccountForm: FC = () => {
  const form = useForm({ validationSchema: AccountSchema })
  const [updateUser] = useUpdateUserMutation()
  // const client = useApolloClient()

  // const onSubmit = async (values: UpdateInput) => {
  //   const res = await updateUser({
  //     variables: { data: values },
  //   })
  //   form.handler(res, {
  //     onSuccess: data => {
  //       console.log(data)

  //       // client.writeQuery<MeQuery>({
  //       //   query: MeDocument,
  //       //   data: { me: data?.updateUser },
  //       // })
  //     },
  //   })
  // }

  const onSubmit = () => {
    console.log("dawg")
  }

  return (
    <Form onSubmit={onSubmit} {...form}>
      <CInput name="firstName" label="First Name" placeholder="Jim" />
      <CInput name="lastName" label="Last Name" placeholder="Sebe" />
      <Flex justify="space-between" align="center" mt={4}>
        <Button
          variantColor="pink"
          type="submit"
          isLoading={form.formState.isSubmitting}
        >
          Login
        </Button>
        {form.appError && <Text color="red.500">{form.appError}</Text>}
      </Flex>
    </Form>
  )
}

export default AccountForm
