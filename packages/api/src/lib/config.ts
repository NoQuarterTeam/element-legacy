// ENV VARIABLES
export const {
  NODE_ENV = "development",
  APP_SECRET = "APP_SECRET",
  PORT = 5000,
  DATABASE_URL = "",
  REDIS_URL = "",
} = process.env

// IS PRODUCTION
export const isProduction = NODE_ENV === "production"

// WEB URL
export const webUrl = isProduction
  ? "https://priceless-neumann-bde8da.netlify.com/"
  : "http://localhost:3000"

// CORS
export const cors = {
  credentials: false,
  origin: "*",
}

//  JWT AUTH
export const jwtAuth = {
  secret: APP_SECRET,
  credentialsRequired: false,
}

// LOADER PATHS
export const loaderPaths = isProduction
  ? "/modules/**/*.loader.js"
  : "/modules/**/*.loader.ts"

// GRAPHQL PATH
export const path = "/graphql"

// RESOLVER PATHS
export const resolverPaths = isProduction
  ? "/modules/**/*.resolver.js"
  : "/modules/**/*.resolver.ts"
