import React from "react"
import { useDropzone } from "react-dropzone"
import gql from "graphql-tag"
import { useForm as useSomthint } from "@noquarter/hooks"
import { formatFileName } from "../lib/helpers"

import { useGetSignedUrlMutation } from "../lib/graphql/types"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Image,
  Icon,
} from "@chakra-ui/core"
import { CButton } from "./CButton"

export const GET_SIGNED_URL = gql`
  mutation GetSignedUrl($data: S3SignedUrlInput!) {
    getSignedS3Url(data: $data)
  }
`

interface Props {
  path: string
  onSubmit: (key: string) => Promise<any>
  button?: boolean
}

export const ImageUploader: React.FC<Props> = props => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [{ values, loading, error }, dispatch] = useSomthint<{
    image: { file: File; preview: string } | null
  }>({ image: null })

  const onDrop = React.useCallback(
    files => {
      dispatch({
        type: "update",
        field: {
          image: {
            file: files[0],
            preview: URL.createObjectURL(files[0]),
          },
        },
      })
      setModalOpen(true)
    },
    [dispatch],
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const [getSignedS3Url] = useGetSignedUrlMutation()

  const handleSubmitImage = async () => {
    if (!values.image) return
    dispatch({ type: "loading" })
    const key = props.path + "/" + formatFileName(values.image.file.name)
    const res = await getSignedS3Url({
      variables: {
        data: {
          key,
          fileType: values.image.file.type,
        },
      },
    }).catch(() => {
      // TODO: network error
    })

    if (res && res.data?.getSignedS3Url) {
      try {
        const signedRequest = res.data.getSignedS3Url

        await fetch(signedRequest, {
          method: "PUT",
          headers: {
            "Content-Type": values.image.file.type,
          },
          body: values.image.file,
        }).catch(() => {
          // TODO: network error
        })
        await props.onSubmit(key)
        handleClose()
      } catch (error) {
        dispatch({ type: "error", error: "Error updating image" })
        console.log(error)
      }
    }
  }

  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: "reset" })
  }

  const handleRemoveFile = React.useCallback(() => {
    if (values.image) URL.revokeObjectURL(values.image.preview)
  }, [values.image])

  React.useEffect(() => handleRemoveFile, [handleRemoveFile])

  return (
    <>
      <Box cursor="pointer" {...(getRootProps() as any)}>
        <input {...(getInputProps() as any)} />
        {props.children}
        {props.button !== false && (
          <Icon
            position="absolute"
            top="0"
            right="-30%"
            name="edit"
            color="gray"
            size="5"
          />
        )}
      </Box>
      <Modal isOpen={modalOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload new image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {values.image && (
              <Image objectFit="contain" w="100%" src={values.image.preview} />
            )}
            {error && <Text>{error}</Text>}
            <ModalFooter>
              <CButton
                isLoading={loading}
                isDisabled={loading}
                loadingText="Submitting"
                onClick={handleSubmitImage}
              >
                Submit
              </CButton>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
