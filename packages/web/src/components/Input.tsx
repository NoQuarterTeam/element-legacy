import React, { InputHTMLAttributes, forwardRef, Ref, memo } from "react"
import styled from "../application/theme"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  style?: any
  prefix?: string
  value?: any
  variant?: string
  labelDirection?: string
}

function Input(
  { label, labelDirection = "column", prefix = "", ...inputProps }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <StyledContainer labelDirection={labelDirection}>
      {label && (
        <StyledLabel labelDirection={labelDirection}>{label}</StyledLabel>
      )}
      <div style={{ width: "100%" }}>
        <StyledPrefix>{prefix}</StyledPrefix>
        <StyledInput {...inputProps} ref={ref} hasPrefix={!!prefix} />
      </div>
    </StyledContainer>
  )
}

export default memo(forwardRef(Input))

const StyledContainer = styled.div<{ labelDirection?: string }>`
  padding: 0;
  display: flex;
  flex-direction: column;
  ${p => p.labelDirection === "row" && "flex-direction: row"};
  ${p => p.labelDirection === "row" && "justify-content: space-between"};
  align-items: flex-start;
  width: 100%;
`

const StyledLabel = styled.label<{ labelDirection?: string }>`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textM};
  ${p => p.labelDirection === "row" && "padding-right: 1rem"};
`

const StyledInput = styled.input<{
  hasPrefix?: boolean
  variant?: string
}>`
  border: 0;
  width: 100%;
  outline: 0;
  background-color: transparent;
  transition: all 200ms;
  appearance: none;
  border-radius: 0;
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textM};
  padding: 0;
  ${p => p.hasPrefix && "padding-left: 16px"};
  // ${p => p.type === "date" && "padding-bottom: 7px"};
  ${p => p.variant === "large" && "font-size: 30px"};
  border-top-left-radius: ${p => p.theme.borderRadius};
  border-top-right-radius: ${p => p.theme.borderRadius};

  &::placeholder {
    color: ${p => p.theme.colorPlaceholder};
  }
`

const StyledPrefix = styled.span`
  position: absolute;
  left: 0;
  top: 11px;
  color: ${p => p.theme.colorLabel};
`
