import axios, { type ResDataType } from './request'

interface SearchOptions {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
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

export async function updateSurvey(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opt: { [key: string]: any },
): Promise<ResDataType> {
  const url = `/api/survey/${id}`
  const data = (await axios.patch(url, { params: opt })) as ResDataType
  return data
}
