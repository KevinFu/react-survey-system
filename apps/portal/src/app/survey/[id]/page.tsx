import Script from 'next/script'
import { getSurveyById } from '@/services/survey'
import { getComponent } from '@/components/SurveyComponents'

type PropsType = { params: Promise<{ id: string }> }

export default async function Stat({ params }: PropsType) {
  const { id } = await params
  const { data } = await getSurveyById(id)

  if (!data) {
    return <div>No Survey</div>
  }

  const { js, componentList } = data

  const ComponentListElem = (
    <>
      {componentList.map((c) => {
        const ComponentElem = getComponent(c)
        return (
          <div
            key={c.fe_id}
            className="border border-t-0 border-r-0 border-l-0 border-gray-300 mx-3 p-2"
          >
            {ComponentElem}
          </div>
        )
      })}
    </>
  )

  return (
    <>
      <form method="POST" action="/api/answer">
        <input type="hidden" name="surveyId" value={id} />
        {ComponentListElem}
        <div className="text-center m-4">
          <button
            className="cursor-pointer text-white bg-[#1677ff] border border-solid px-4 py-1"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <Script id="page-js">{js}</Script>
    </>
  )
}
