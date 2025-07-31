import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline'
import { HOME_PATHNAME } from '../routers'

const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-warning mb-4" />
          <h2 className="card-title text-4xl font-bold text-error">404</h2>
          <h3 className="text-xl font-semibold mb-2">Page Not Found</h3>
          <p className="text-base-content/70 mb-6">
            Sorry, the page you are looking for does not exist or has been
            removed.
          </p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate(HOME_PATHNAME)}
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
