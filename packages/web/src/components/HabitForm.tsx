import React, { useState } from "react"
import styled from "../application/theme"

import useFormState from "../lib/hooks/useFormState"
import { useAllElements } from "../lib/graphql/element/hooks"

import Button from "./Button"
import ElementDropdown from "./ElementDropdown"
import { sleep } from "../lib/helpers"
import { HabitFragment } from "../lib/graphql/types"
import Input from "./Input"
import { useTimelineContext } from "./providers/TimelineProvider"

interface HabitFormProps {
  onFormSubmit: (data: any) => Promise<any>
  day: string
  habits: HabitFragment[]
}
function HabitForm({ onFormSubmit, habits, day }: HabitFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { selectedUserId } = useTimelineContext()
  const elements = useAllElements(selectedUserId)

  const { formState, setFormState } = useFormState({
    elementId: "",
    activeFrom: day,
  })

  const handleHabitUpdate = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    onFormSubmit(formState)
      .then(() => setFormState({ elementId: "" }))
      .catch(async () => {
        setError("Oops, something went wrong, we have been notified!")
        await sleep(4000)
        setError(null)
        setLoading(false)
      })

    setLoading(false)
  }

  const habitIds = habits.map(habit => habit.element.id)

  return (
    <StyledForm onSubmit={handleHabitUpdate}>
      <StyledRow>
        <ElementDropdown
          selectedElementId={formState.elementId ? formState.elementId : ""}
          handleSelectElement={element =>
            setFormState({ elementId: element.id })
          }
          elements={
            elements && elements.filter(el => !habitIds.includes(el.id))
          }
          placeholder="Add a habit"
        />
        <Input hidden defaultValue={formState.activeFrom} />
        {formState.elementId && (
          <Button
            loading={loading}
            variant="tertiary"
            style={{ marginLeft: "1rem" }}
          >
            Add
          </Button>
        )}
      </StyledRow>

      {error && <StyledError>{error}</StyledError>}
    </StyledForm>
  )
}

export default HabitForm

const StyledForm = styled.form`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  ${p => p.theme.flexCenter};
  align-items: flex-start;
  flex-direction: column;
`

const StyledError = styled.p`
  color: red;
`

const StyledRow = styled.div`
  ${p => p.theme.flexCenter};
  justify-content: flex-start;
  width: 100%;
`
