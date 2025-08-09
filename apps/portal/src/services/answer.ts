import { post } from './request'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postAnswer(answerInfo: any) {
  const url = '/api/answer'
  const data = await post(url, answerInfo)

  return data
}
