import React, { FC, Fragment } from "react"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

import { ApolloProvider as ReactApolloProvider } from "react-apollo-hooks"
import { apiUrl } from "../../lib/config"

const httpLink = createHttpLink({
  uri: apiUrl,
})

const authLink = setContext(async () => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const ApolloProvider: FC = ({ children }) => {
  return (
    <ReactApolloProvider client={client}>
      <Fragment>{children}</Fragment>
    </ReactApolloProvider>
  )
}

export default ApolloProvider
