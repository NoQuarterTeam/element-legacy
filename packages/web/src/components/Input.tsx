import React, { InputHTMLAttributes, forwardRef, Ref, memo } from "react"
import styled, { lighten } from "../application/theme"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  style?: any
  prefix?: string
  value?: any
}

function Input(
  { label, prefix = "", ...inputProps }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <StyledContainer>
      {label && <StyledLabel>{label}</StyledLabel>}
      <div>
        <StyledPrefix>{prefix}</StyledPrefix>
        <StyledInput {...inputProps} ref={ref} hasPrefix={!!prefix} />
      </div>
    </StyledContainer>
  )
}

export default memo(forwardRef(Input))

const StyledContainer = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingS} 0;
`

const StyledLabel = styled.label`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
`

const StyledInput = styled.input<{ hasPrefix?: boolean }>`
  border: 0;
  width: 100%;
  outline: 0;
  background-color: transparent;
  transition: all 200ms;
  appearance: none;
  border-radius: 0;
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} 0;
  ${p => p.hasPrefix && "padding-left: 16px"};
  ${p => p.type === "date" && "padding-bottom: 7px"};
  border-top-left-radius: ${p => p.theme.borderRadius};
  border-top-right-radius: ${p => p.theme.borderRadius};

  &::placeholder {
    color: ${p => p.theme.colorPlaceholder};
  }

  &:focus {
  }
`

const StyledPrefix = styled.span`
  position: absolute;
  left: 0;
  top: 11px;
  color: ${p => p.theme.colorLabel};
`
