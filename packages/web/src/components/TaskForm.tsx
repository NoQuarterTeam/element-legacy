import React, { useState, useEffect } from "react"
import styled from "../application/theme"

import { TaskFragment } from "../lib/graphql/types"
import useFormState from "../lib/hooks/useFormState"
import { sleep } from "../lib/helpers"
import { useAllElements } from "../lib/graphql/element/hooks"

import Input from "./Input"
import Button from "./Button"
import ElementDropdown from "./ElementDropdown"
import Checkbox from "./Checkbox"
import dayjs from "dayjs"
import TextArea from "./TextArea"

interface TaskFormProps {
  onFormSubmit: (data: any) => Promise<any>
  task: TaskFragment
  onDeleteTask: () => void
  onDuplicateTask: () => void
}
function TaskForm({
  onFormSubmit,
  task,
  onDeleteTask,
  onDuplicateTask,
}: TaskFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const elements = useAllElements()

  const initialState = {
    name: task ? task.name : "",
    completed: task ? task.completed : false,
    elementId: task.element ? task.element.id : "",
    scheduledDate: task.scheduledDate ? task.scheduledDate : "",
    estimatedTime: task.estimatedTime ? task.estimatedTime : "",
    startTime: task.startTime ? task.startTime : "",
    description: task.description ? task.description : "",
  }

  const { formState, setFormState } = useFormState(initialState)

  useEffect(() => {
    if (task) {
      setFormState(initialState)
    }
  }, [task])

  const handleTaskUpdate = async (e: any) => {
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
    <StyledForm onSubmit={handleTaskUpdate}>
      <Input
        value={formState.name ? formState.name : ""}
        onChange={e => setFormState({ name: e.target.value })}
        placeholder="What is it?"
        required={true}
        variant="large"
        style={{ marginTop: 0, paddingTop: 0 }}
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
            selectedElementId={formState.elementId ? formState.elementId : ""}
            handleSelectElement={element =>
              setFormState({ elementId: element.id })
            }
            elements={elements}
            placeholder="Select an element..."
          />
          <Input
            type="time"
            label="How long for?"
            labelDirection="row"
            value={formState.estimatedTime ? formState.estimatedTime : ""}
            onChange={e => setFormState({ estimatedTime: e.target.value })}
          />
        </StyledRow>
        <StyledRow>
          <Input
            type="date"
            value={
              formState.scheduledDate
                ? dayjs(formState.scheduledDate).format("YYYY-MM-DD")
                : dayjs().format("YYYY-MM-DD")
            }
            onChange={e => setFormState({ scheduledDate: e.target.value })}
          />
          <Input
            type="time"
            label="What time?"
            labelDirection="row"
            value={formState.startTime ? formState.startTime : ""}
            onChange={e => setFormState({ startTime: e.target.value })}
          />
        </StyledRow>
        <StyledRow>
          <TextArea
            placeholder="Description"
            type="textarea"
            value={formState.description ? formState.description : ""}
            onChange={e => setFormState({ description: e.target.value })}
          />
        </StyledRow>
        <StyledRow style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Button loading={loading} variant="secondary" onClick={onDeleteTask}>
            Delete
          </Button>
          <Button
            loading={loading}
            variant="secondary"
            onClick={onDuplicateTask}
          >
            Duplicate
          </Button>
          <Button loading={loading} variant="primary">
            Submit
          </Button>
        </StyledRow>
      </StyledGrid>
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
  ${p => p.theme.flexCenter};
  align-items: flex-start;
  flex-direction: column;
`

const StyledCheckboxWrapper = styled.div`
  position: absolute;
  top: ${p => p.theme.paddingM};
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
