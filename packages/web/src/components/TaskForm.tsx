import React, { useState, useEffect } from "react"
import styled from "../application/theme"
import dayjs from "dayjs"

import { TaskFragment } from "../lib/graphql/types"
import useFormState from "../lib/hooks/useFormState"
import { sleep, isMobileDevice } from "../lib/helpers"
import { useAllElements } from "../lib/graphql/element/hooks"
import { useGetSharedUsersByUser } from "../lib/graphql/sharedElement/hooks"

import { Duplicate } from "styled-icons/boxicons-regular/Duplicate"
import { DeleteOutline } from "styled-icons/material/DeleteOutline"

import Input from "./Input"
import Button from "./Button"
import ElementDropdown from "./ElementDropdown"
import Checkbox from "./Checkbox"
import TextArea from "./TextArea"
import { useTimelineContext } from "./providers/TimelineProvider"
import { useMe } from "./providers/MeProvider"

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
  const user = useMe()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [validation, setValidation] = useState<string | null>(null)

  const { selectedUserId } = useTimelineContext()

  const sharedUsers = useGetSharedUsersByUser(user.id)

  const elements = useAllElements(user.id)

  const initialState = {
    name: task ? task.name : null,
    completed: task ? task.completed : false,
    elementId: task.element ? task.element.id : null,
    userId: task.userId ? task.userId : selectedUserId,
    scheduledDate: task.scheduledDate ? task.scheduledDate : "",
    estimatedTime: task.estimatedTime ? task.estimatedTime : "00:00",
    startTime: task.startTime ? task.startTime : "",
    description: task.description ? task.description : "",
  }

  const { formState, setFormState } = useFormState(initialState)

  useEffect(() => {
    if (task) {
      setFormState(initialState)
    }
  }, [initialState, setFormState, task])

  const handleTaskUpdate = async (e: any) => {
    e.preventDefault()
    if (!formState.name) {
      setValidation("Enter a task name")
    } else if (!formState.elementId) {
      setValidation("Select an element")
    } else {
      setLoading(true)
      onFormSubmit(formState).catch(async () => {
        setError("Oops, something went wrong, we have been notified!")
        await sleep(4000)
        setError(null)
        setLoading(false)
      })
    }
  }

  const handleUserSelect = (userId: string) => {
    setFormState({ ...formState, userId })
  }

  const selectUserOptions =
    sharedUsers &&
    sharedUsers.map(user => ({
      label: user.firstName,
      value: user.id,
    }))

  return (
    <StyledForm onSubmit={handleTaskUpdate}>
      <Input
        value={formState.name ? formState.name : ""}
        onChange={e => setFormState({ name: e.target.value })}
        placeholder="What is it?"
        required={true}
        variant="large"
        autoFocus={isMobileDevice() ? false : true}
        style={{
          width: "90%",
          marginTop: 0,
          paddingTop: 0,
          marginBottom: "1rem",
        }}
      />

      <StyledFinish>
        <StyledCheckboxWrapper>
          <Checkbox
            value={formState.completed ? formState.completed : false}
            onChange={() => setFormState({ completed: !formState.completed })}
          />
        </StyledCheckboxWrapper>
      </StyledFinish>

      <StyledGrid>
        <StyledRow>
          <StyledLabel>Element</StyledLabel>
          <ElementDropdown
            selectedElementId={formState.elementId ? formState.elementId : ""}
            handleSelectElement={element =>
              setFormState({ elementId: element.id })
            }
            elements={elements}
            placeholder="Select..."
          />
        </StyledRow>
        <StyledRow style={{ width: "fit-content" }}>
          <StyledLabel>Who?</StyledLabel>
          <select
            value={formState.userId}
            onChange={e => handleUserSelect(e.target.value)}
          >
            <option value={user.id}>{user.firstName}</option>
            {selectUserOptions?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </StyledRow>
        <StyledRow>
          <StyledLabel>How long?</StyledLabel>
          <Input
            type="time"
            labelDirection="row"
            value={formState.estimatedTime ? formState.estimatedTime : ""}
            onChange={e => setFormState({ estimatedTime: e.target.value })}
          />
        </StyledRow>
        <StyledRow>
          <StyledLabel>What day?</StyledLabel>
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
          <StyledLabel>What time?</StyledLabel>
          <Input
            type="time"
            labelDirection="row"
            value={formState.startTime ? formState.startTime : ""}
            onChange={e => setFormState({ startTime: e.target.value })}
          />
        </StyledRow>
        <StyledRow>
          <TextArea
            placeholder="Notes"
            type="textarea"
            value={formState.description ? formState.description : ""}
            onChange={e => setFormState({ description: e.target.value })}
            style={{
              fontSize: "1rem",
            }}
          />
        </StyledRow>
        <StyledRow
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Button type="submit" loading={loading} variant="primary">
            Submit
          </Button>
          <div>
            <Duplicate
              onClick={onDuplicateTask}
              color="black"
              width="30px"
              cursor="pointer"
            />
            <DeleteOutline
              onClick={onDeleteTask}
              color="black"
              width="30px"
              cursor="pointer"
            />
          </div>
        </StyledRow>
      </StyledGrid>
      {error && <StyledError>{error}</StyledError>}
      {validation && <StyledError>{validation}</StyledError>}
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

const StyledLabel = styled.p`
  min-width: 130px;
  height: 50px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`

const StyledCheckboxWrapper = styled.div``

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
  width: 100%;
  align-items: center;
`

const StyledFinish = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
