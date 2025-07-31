import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'

import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import NotFound from '../pages/not-found'
import List from '../pages/manage/list'
import Star from '../pages/manage/star'
import Trash from '../pages/manage/trash'
import Edit from '../pages/survey/edit'
import SurveyLayout from '../layouts/SurveyLayout'
import Statistics from '../pages/survey/statistics'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/manage',
        element: <ManageLayout />,
        children: [
          {
            path: '/manage/list',
            element: <List />,
          },
          {
            path: '/manage/star',
            element: <Star />,
          },
          {
            path: '/manage/trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/survey',
    element: <SurveyLayout />,
    children: [
      {
        path: '/survey/edit/:id',
        element: <Edit />,
      },
      {
        path: '/survey/statistics/:id',
        element: <Statistics />,
      },
    ],
  },
])

export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_LIST_PATHNAME = '/manage/list'
