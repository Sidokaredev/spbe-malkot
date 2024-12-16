import { v4 as uuidv4 } from "uuid"

export class APIService {
  private static RequestBody: Record<string, any> = {}
  constructor() {

  }

  static JSONRequest<T>(body: T) {
    const key = uuidv4()
    this.RequestBody[key] = JSON.stringify(body)
    return this
  }
}