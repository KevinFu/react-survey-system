import axios, { type ResDataType } from './request'

export async function getSurveyStatListService(
  surveyId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> {
  const url = `/api/stat/${surveyId}`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

export async function getComponentStatService(
  surveyId: string,
  componentId: string,
): Promise<ResDataType> {
  const url = `/api/stat/${surveyId}/${componentId}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
