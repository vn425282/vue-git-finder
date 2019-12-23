import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.use(VueApollo)

const GIT_PUBLIC_TOKEN = '5bed43dd7d5db2aa054e7add3ff746af4300747b'
const httpEndpoint = ' https://api.github.com/graphql'

// Config
const defaultOptions = {
  httpEndpoint,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  cache: new InMemoryCache({
    freezeResults: false
  }),

  getAuth: () => {
    return 'Bearer ' + GIT_PUBLIC_TOKEN;
  }
}

export function createProvider (options = {}) {
  const { apolloClient } = createApolloClient({
    ...defaultOptions,
    ...options
  })

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: { },
    errorHandler (error) {
      console.log('[Error-Apollo]' + error);
    }
  })

  return apolloProvider;
}
