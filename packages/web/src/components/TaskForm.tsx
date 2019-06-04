import React, { useState, useEffect } from "react"
import styled from "../application/theme"

import { Task, TaskInput } from "../lib/graphql/types"
import useFormState from "../lib/hooks/useFormState"
import { sleep } from "../lib/helpers"

import Input from "./Input"
import Button from "./Button"
import ElementDropdown from "./ElementDropdown"
import Checkbox from "./Checkbox"
import dayjs = require("dayjs")

interface TaskFormProps {
  onFormSubmit: (data: any) => Promise<any>
  task: Task
}
function TaskForm({ onFormSubmit, task }: TaskFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const initialState = {
    name: task ? task.name : "",
    completed: task ? task.completed : false,
    elementId: task ? task.element.id : "",
    scheduledDate: task ? task.scheduledDate : "",
    estimatedTime: task ? task.estimatedTime : "",
    startTime: task ? task.startTime : "",
    description: task ? task.description : "",
  }

  const { formState, setFormState } = useFormState<TaskInput>(initialState)

  useEffect(() => {
    if (task) {
      setFormState(initialState)
    }
  }, [task])

  const handleTaskCreate = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    onFormSubmit(formState).catch(async () => {
      setError("Oops, something went wrong, we have been notified!")
      await sleep(4000)
      setError(null)
      setLoading(false)
    })
  }

  return (
    <StyledForm onSubmit={handleTaskCreate}>
      <Input
        value={formState.name ? formState.name : ""}
        onChange={e => setFormState({ name: e.target.value })}
        placeholder="Task name"
        required={true}
        variant="large"
      />

      <StyledCheckboxWrapper>
        <Checkbox
          value={formState.completed ? formState.completed : false}
          onChange={() => setFormState({ completed: !formState.completed })}
        />
      </StyledCheckboxWrapper>

      <StyledGrid>
        <StyledRow>
          <ElementDropdown
            selectedElement={
              formState.elementId ? formState.elementId : undefined
            }
            handleSelectElement={element =>
              setFormState({ elementId: element.id })
            }
          />
          <Input
            type="date"
            value={
              formState.scheduledDate
                ? dayjs(formState.scheduledDate).format("YYYY-MM-DD")
                : dayjs().format("YYYY-MM-DD")
            }
            onChange={e => setFormState({ scheduledDate: e.target.value })}
          />
        </StyledRow>
        <StyledRow>
          <Input
            type="time"
            label="Estimated time:"
            labelDirection="row"
            value={formState.estimatedTime ? formState.estimatedTime : ""}
            onChange={e => setFormState({ estimatedTime: e.target.value })}
          />
          <Input
            type="time"
            label="Start time:"
            labelDirection="row"
            value={formState.startTime ? formState.startTime : ""}
            onChange={e => setFormState({ startTime: e.target.value })}
          />
        </StyledRow>
        <StyledRow>
          <Input
            placeholder="Description"
            style={{ width: "100%" }}
            value={formState.description ? formState.description : ""}
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
`

const StyledCheckboxWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const StyledError = styled.p`
  color: red;
`

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

// const StyledCheckboxWrapper = styled.label`
//   position: absolute;
//   right: ${props => props.theme.paddingLarge};
//   top: ${props => props.theme.paddingLarge};
// `
