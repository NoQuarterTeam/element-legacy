import React, { useState } from "react"
import styled from "../application/theme"

import { CreateTaskInput } from "../lib/graphql/types"
import useFormState from "../lib/hooks/useFormState"
import { sleep } from "../lib/helpers"

import Input from "./Input"
import Button from "./Button"
import ElementDropdown from "./ElementDropdown"

interface TaskFormProps {
  onFormSubmit: (data: CreateTaskInput) => Promise<any>
}
function TaskForm({ onFormSubmit }: TaskFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { formState, setFormState } = useFormState<CreateTaskInput>({
    name: "",
  })

  const handleTaskCreate = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const taskData = {
      ...formState,
    }
    onFormSubmit(taskData).catch(async () => {
      setError("Oops, something went wrong, we have been notified!")
      await sleep(4000)
      setError(null)
      setLoading(false)
    })
  }

  return (
    <StyledForm onSubmit={handleTaskCreate}>
      <Input
        value={formState.name}
        onChange={e => setFormState({ name: e.target.value })}
        placeholder="New task"
        required={true}
        // variant="primary"
      />

      {/* <StyledCheckboxWrapper>
        <Checkbox
          checked={completed}
          value={completed}
          onChange={() => setCompleted(!completed)}
        />
      </StyledCheckboxWrapper> */}

      <StyledGrid>
        <StyledRow>
          <ElementDropdown
            // handleSelectElement={id => setElementId(id)}
            // handleUpdateElement={handleUpdateElement}
            selectedElement={formState.elementId}
            selectElement={elementId => setFormState({ elementId })}
          />
          <div>
            <Input
              type="date"
              value={formState.scheduledDate}
              onChange={e => setFormState({ scheduledDate: e.target.value })}
            />
            @
            <Input
              type="time"
              value={formState.startTime}
              onChange={e => setFormState({ startTime: e.target.value })}
            />
          </div>
        </StyledRow>
        <StyledRow>
          Estimated Time
          <Input
            type="time"
            value={formState.estimatedTime}
            onChange={e => setFormState({ estimatedTime: e.target.value })}
          />
        </StyledRow>
        <StyledRow>
          <Input
            placeholder="Description"
            style={{ width: "100%" }}
            value={formState.description}
            onChange={e => setFormState({ description: e.target.value })}
          />
        </StyledRow>
      </StyledGrid>
      <br />
      <Button loading={loading} variant="secondary">
        Submit
      </Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledForm>
  )
}

export default TaskForm

const StyledForm = styled.form`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingL};
`

const StyledError = styled.p`
  color: red;
`

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`

// const StyledCheckboxWrapper = styled.label`
//   position: absolute;
//   right: ${props => props.theme.paddingLarge};
//   top: ${props => props.theme.paddingLarge};
// `
