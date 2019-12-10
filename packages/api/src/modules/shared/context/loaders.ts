import { createParamDecorator } from "type-graphql"
import { elementChildrenLoader } from "../../element/element.loader"

export interface Loaders {
  elementChildrenLoader: ReturnType<typeof elementChildrenLoader>
}

export function Loaders() {
  return createParamDecorator<{ loaders: Loaders }>(async ({ context }) => {
    return context.loaders
  })
}
