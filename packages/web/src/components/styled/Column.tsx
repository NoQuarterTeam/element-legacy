import React, { FC } from "react"
import styled from "../../application/theme"

interface ColumnProps {
  flex?: number
  style?: any
}

const Column: FC<ColumnProps> = ({ children, flex = 1, style }) => {
  return (
    <StyledColumn style={style} flex={flex}>
      {children}
    </StyledColumn>
  )
}

export default Column

const StyledColumn = styled.div<{ flex: number }>`
  flex: ${p => p.flex};
  display: flex;
`
