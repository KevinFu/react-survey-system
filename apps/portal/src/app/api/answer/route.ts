import { NextResponse } from 'next/server'
import { postAnswer } from '@/services/answer'

function genAnswerInfo(reqBody: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answerList: any[] = []

  for (const [key, value] of reqBody.entries()) {
    if (key !== 'surveyId') {
      answerList.push({
        componentId: key,
        value,
      })
    }
  }

  return {
    surveyId: reqBody.get('surveyId'),
    answerList,
  }
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const answerInfo = genAnswerInfo(formData)
  const failUrl = new URL('/survey/fail', req.url)
  const successUrl = new URL('/survey/success', req.url)

  try {
    const data = await postAnswer(answerInfo)

    console.log(answerInfo, 'answerInfo')

    if (data.code === 0) {
      return NextResponse.redirect(successUrl)
    } else {
      return NextResponse.redirect(failUrl)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.redirect(failUrl)
  }
}
