import axios, { type ResDataType } from './request'

interface SearchOptions {
  keyword: string
  isStar: boolean
  isDeleted: boolean
}

export async function getSurvey(id: string): Promise<ResDataType> {
  const url = `/api/survey/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

export async function createSurvey(): Promise<ResDataType> {
  const url = '/api/survey'
  const data = (await axios.post(url)) as ResDataType
  return data
}

export async function getSurveyList(
  opt: Partial<SearchOptions> = {},
): Promise<ResDataType> {
  const url = '/api/survey'
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}
