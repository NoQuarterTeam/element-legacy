import React, { FC, useState } from "react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core"

import { ReactMultiEmail, isEmail } from "react-multi-email"
import "react-multi-email/style.css"
import Button from "./Button"
import styled from "../application/theme"

import {
  useCreateSharedElements,
  useGetSharedUsersByElement,
  useDeleteSharedElement,
} from "../lib/graphql/sharedElement/hooks"
import FlexGrid from "./styled/FlexGrid"
import { UserFragment, ElementFragment } from "../lib/graphql/types"
import { darken, lighten } from "polished"
import Spacer from "./styled/Spacer"
import { useMe } from "./providers/MeProvider"
import { isMobileDevice } from "../lib/helpers"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  element: ElementFragment
}
const ShareModal: FC<ShareModalProps> = ({ isOpen, onClose, element }) => {
  const currentUser = useMe()

  const [error, setError] = useState()
  const [emails, setEmails] = useState()
  const [createSharedElements] = useCreateSharedElements(
    currentUser.id,
    element.id,
  )
  const allSharedUsers = useGetSharedUsersByElement(element.id)

  const handleShareElement = async () => {
    const data = { emails, elementId: element.id }
    const res = await createSharedElements({
      variables: { data },
    })
    if (res && res.errors) {
      setError(res.errors[0].message)
    } else {
      setEmails("")
      setError("")
    }
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email: string) => email !== emailToRemove))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={["full", "lg"]}>
      <ModalOverlay />
      <ModalContent
        m={0}
        height={["100vh", "auto"]}
        border="solid"
        borderWidth={4}
        borderColor="black"
      >
        <ModalBody p={12} m={0}>
          {isMobileDevice() && <ModalCloseButton />}
          <h2>{element.name}</h2>
          <Spacer />
          <FlexGrid
            style={{ marginBottom: "1rem", justifyContent: "flex-start" }}
          >
            {allSharedUsers &&
              allSharedUsers.map((user: UserFragment) => {
                return (
                  <SharedUser
                    key={user.id}
                    userId={currentUser.id}
                    sharedUser={user}
                    element={element}
                  />
                )
              })}
          </FlexGrid>

          <ReactMultiEmail
            emails={emails}
            onChange={emails => {
              setEmails(emails)
            }}
            validateEmail={email => {
              return isEmail(email) // return boolean
            }}
            style={{ width: "100%" }}
            getLabel={(email, index) => {
              return (
                <div data-tag key={index}>
                  {email}
                  <span
                    data-tag-handle
                    onClick={() => handleRemoveEmail(email)}
                  >
                    ×
                  </span>
                </div>
              )
            }}
          />
          {error && <StyledError>{error}</StyledError>}
          <FlexGrid style={{ justifyContent: "flex-end" }}>
            <Spacer />
            <Button onClick={handleShareElement}>Share</Button>{" "}
          </FlexGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal

interface SharedUserProps {
  userId: string
  sharedUser: UserFragment
  element: ElementFragment
}

const SharedUser: FC<SharedUserProps> = ({ userId, sharedUser, element }) => {
  const [deleteSharedElement] = useDeleteSharedElement(
    sharedUser.id,
    userId,
    element.id,
  )
  const handleUnshareElement = async (email: string) => {
    await deleteSharedElement({
      variables: {
        elementId: element.id,
        email,
      },
    })
  }
  return (
    <StyledOptionContainer>
      <StyledOption>{sharedUser.email}</StyledOption>
      <StyledDelete onClick={() => handleUnshareElement(sharedUser.email)}>
        x
      </StyledDelete>
    </StyledOptionContainer>
  )
}

const StyledDelete = styled.p`
  font-size: ${p => p.theme.textS};
  color: ${p => p.theme.colorLabel};
  position: absolute;
  top: 0;
  right: ${p => p.theme.paddingM};
  visibility: hidden;
`

const StyledOption = styled.p`
  width: 100%;
  font-size: ${p => p.theme.textM};
`

const StyledOptionContainer = styled.div`
  position: relative;
  ${p => p.theme.flexCenter};
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL};
  cursor: pointer;
  margin: ${p => p.theme.paddingS} 0;
  color: ${p => darken(0.2, p.theme.colorLabel)};
  background-color: ${p => lighten(0.2, p.theme.colorLabel)};
  margin-right: ${p => p.theme.paddingM};
  border: ${props => `1px solid ${lighten(0.2, props.theme.colorLabel)}`};

  &:hover ${StyledDelete} {
    visibility: visible;
    transform: scale(1.2);
  }
`

const StyledError = styled.p`
  font-size: ${p => p.theme.textS};
  color: ${p => p.theme.colorWarning};
`
