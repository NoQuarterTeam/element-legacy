import React, { TextareaHTMLAttributes, forwardRef, Ref, memo } from "react"
import styled from "../application/theme"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string
  type: string
  value: string
  // onchange: (e: any) => void
}

function TextArea(
  { ...inputProps }: TextareaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  return <StyledTextArea {...inputProps} ref={ref} />
}

export default memo(forwardRef(TextArea))

const StyledTextArea = styled.textarea`
  border: 0;
  width: 100%;
  resize: none;
  outline: 0;
  background-color: transparent;
  transition: all 200ms;
  appearance: none;
  border-radius: 0;
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} 0;
  border-top-left-radius: ${p => p.theme.borderRadius};
  border-top-right-radius: ${p => p.theme.borderRadius};

  &::placeholder {
    color: ${p => p.theme.colorPlaceholder};
  }

  &:focus {
  }
`
