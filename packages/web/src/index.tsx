import React from "react"
import ReactDOM from "react-dom"

import Application from "./application"
import GlobalStyles from "./lib/globalStyles"
import "./lib/prototypes"

const UI = () => (
  <React.Fragment>
    <GlobalStyles />
    <Application />
  </React.Fragment>
)

ReactDOM.render(<UI />, document.getElementById("root"))
