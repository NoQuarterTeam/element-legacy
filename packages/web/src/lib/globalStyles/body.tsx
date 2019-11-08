import { css } from "../../application/theme"

const body = css`
  @import url(//fonts.googleapis.com/earlyaccess/laosanspro.css);
  @import url(//fonts.googleapis.com/css?family=Open+Sans&display=swap);

  html,
  body {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  a,
  ul,
  ol {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  * {
    font-family: "Lao Sans Pro", sans-serif;
    box-sizing: border-box;
    position: relative;
  }

  *:focus {
    outline: none;
  }
`

export default body
