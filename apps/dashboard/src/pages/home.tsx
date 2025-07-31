import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MANAGE_LIST_PATHNAME } from '../routers'

const Home: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h2 className="text-6xl mb-4">Survey & Online Vote</h2>
      <p className="mb-6 text-lg">
        A total of 20 surveys created, 10 published, and 90 responses received
      </p>
      <button
        className="btn btn-primary w-[200px]"
        onClick={() => {
          navigate(MANAGE_LIST_PATHNAME)
        }}
      >
        Get Started
      </button>
    </div>
  )
}
export default Home
