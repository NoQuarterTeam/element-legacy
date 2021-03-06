import { css } from "../../application/theme"

const overides = css`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  button {
    appearance: none;
    border: 0;
    cursor: pointer;
    background-color: transparent;
  }

  [data-react-beautiful-dnd-droppable="0"] {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

export default overides
