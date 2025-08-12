import { getSurveyById } from '@/services/survey'

type PropsType = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PropsType) {
  const { id } = await params

  const { code, data } = await getSurveyById(id)

  let { title } = data || {}
  const { desc, isPublished, isDeleted } = data || {}

  if (code !== 0 || !data) {
    title = 'No Survey'
  }
  if (!isPublished) {
    title = 'Survey is not published'
  }
  if (isDeleted) {
    title = 'Survey is deleted'
  }

  return {
    title,
    description: desc,
  }
}

export default async function SurveyLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { code, msg, data } = await getSurveyById(id)

  const { css = '', isPublished, isDeleted } = data || {}

  if (code !== 0 || !data) {
    return <div>{msg}</div>
  }

  if (code !== 0 || !data) {
    return <div>No Survey</div>
  }
  if (!isPublished) {
    return <div>Survey is not published</div>
  }
  if (isDeleted) {
    return <div>Survey is deleted</div>
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </>
  )
}
