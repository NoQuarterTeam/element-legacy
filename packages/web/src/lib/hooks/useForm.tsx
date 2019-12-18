import React from "react"
import useHookForm from "react-hook-form"
import { ExecutionResult } from "@apollo/client"
import { UseFormOptions } from "react-hook-form/dist/types"
import { useToast } from "./useToast"
import { MutationHandler, mutationHandler } from "../mutationHandler"
import { FormattedError } from "../helpers"

export function useForm<T extends {}>(props?: UseFormOptions<T>) {
  const toast = useToast()
  const [appError, setAppError] = React.useState<string | null | undefined>()
  const form = useHookForm<T>({
    mode: "onChange",
    reValidateMode: "onChange",
    validateCriteriaMode: "all",
    ...props,
  })
  const setFieldErrors = (errors: FormattedError[]) =>
    form.setError(errors as any)
  function handler<R>(
    res: ExecutionResult<NonNullable<R>> | void,
    handler?: MutationHandler<R>,
  ) {
    setAppError(null)
    mutationHandler(res, handler, { setAppError, setFieldErrors }, toast)
  }
  return {
    ...form,
    appError,
    setAppError,
    handler,
  }
}
