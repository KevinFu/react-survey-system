import type { FC } from 'react'
import SurveyList from './pages/list'

const App: FC = () => {
  return (
    <>
      <h1 className="text-2xl text-red-500">Survey System Dashboard</h1>
      <SurveyList />
    </>
  )
}

export default App
