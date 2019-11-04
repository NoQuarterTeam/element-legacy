import React, { FC, Fragment } from "react"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"

import { setContext } from "apollo-link-context"
import { ApolloProvider as ReactApolloProvider } from "react-apollo-hooks"
import { apiUrl } from "../../lib/config"
import { split } from "apollo-link"
import { getMainDefinition } from "apollo-utilities"

const httpLink = createHttpLink({
  uri: apiUrl,
})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMmNhZDJlLWJlOTMtNDYyOC04ZjgwLTkwYmJiMGE0MjI4NCIsImlhdCI6MTU3MTMwOTMxNywiZXhwIjoxNTczNzI4NTE3LCJhdWQiOlsiQGVsZW1lbnQvYXBwIiwiQGVsZW1lbnQvd2ViIl0sImlzcyI6IkBlbGVtZW50L2FwaSJ9.LCdg1MrFulXfojoLcCe4sYuFG02qXvQ_RbwaTji5yCs",
    },
  },
})

// Create WebSocket client
// const WSClient = new SubscriptionClient(`ws://localhost:4000/api/ws`, {
//   reconnect: true,
//   connectionParams: {
//     // Connection parameters to pass some validations
//     // on server side during first handshake
//   },
// })

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink,
)

const authLink = setContext(async () => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
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
