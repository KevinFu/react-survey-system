import { get } from './request'

export interface SurveyData {
  id: string
  title: string
  desc?: string
  css?: string
  js?: string
  isPublished?: boolean
  isDeleted: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentList: any[]
}

export interface GetSurveyByIdResult {
  code: number
  data?: SurveyData | null
  msg?: string
}

export async function getSurveyById(id: string): Promise<GetSurveyByIdResult> {
  const url = `/api/survey/${id}`
  const data = await get(url)

  return data
}
