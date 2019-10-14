import React, { FC, useState } from "react"

import Modal from "./Modal"

import { ReactMultiEmail, isEmail } from "react-multi-email"
import "react-multi-email/style.css"
import { useTimelineContext } from "./providers/TimelineProvider"
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
import useAppContext from "../lib/hooks/useAppContext"
import Spacer from "./styled/Spacer"

interface ShareModalProps {
  closeModal: () => void
}
const ShareModal: FC<ShareModalProps> = ({ closeModal }) => {
  const [emails, setEmails] = useState()
  const [error, setError] = useState()

  const { user: currentUser } = useAppContext()
  const { selectedElement } = useTimelineContext()
  const createSharedElements = useCreateSharedElements(
    currentUser.id,
    selectedElement.id,
  )
  const allSharedUsers = useGetSharedUsersByElement(selectedElement.id)

  const handleShareElement = async () => {
    const data = { emails, elementId: selectedElement.id }
    const res = await createSharedElements({
      errorPolicy: "all",
      variables: {
        data,
      },
    })
    if (res && res.errors) {
      setError(res.errors[0].message)
    } else {
      setEmails("")
      setError("")
    }
    // handleSetModal("")
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email: string) => email !== emailToRemove))
  }

  return (
    <Modal onClose={closeModal}>
      <h2>{selectedElement.name}</h2>
      <Spacer />
      <FlexGrid style={{ marginBottom: "1rem", justifyContent: "flex-start" }}>
        {allSharedUsers &&
          allSharedUsers.map((user: UserFragment) => {
            return (
              <SharedUser
                key={user.id}
                userId={currentUser.id}
                sharedUser={user}
                selectedElement={selectedElement}
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
              <span data-tag-handle onClick={() => handleRemoveEmail(email)}>
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
    </Modal>
  )
}

export default ShareModal

interface SharedUserProps {
  userId: string
  sharedUser: UserFragment
  selectedElement: ElementFragment
}

const SharedUser: FC<SharedUserProps> = ({
  userId,
  sharedUser,
  selectedElement,
}) => {
  const deleteSharedElement = useDeleteSharedElement(
    sharedUser.id,
    userId,
    selectedElement.id,
  )
  const handleUnshareElement = async (email: string) => {
    await deleteSharedElement({
      variables: {
        elementId: selectedElement.id,
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
