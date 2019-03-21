import { Request, Response } from "express"

export interface IResolverContext {
  req: IRequest
  res: Response
  userId: string
}

export interface IRequest extends Request {
  user?: { id: string }
}
