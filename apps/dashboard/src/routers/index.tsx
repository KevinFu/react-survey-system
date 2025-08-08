import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import SurveyLayout from '../layouts/SurveyLayout'

import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import NotFound from '../pages/not-found'

import List from '../pages/manage/list'
import Star from '../pages/manage/star'
import Trash from '../pages/manage/trash'

const Edit = lazy(() => import('../pages/survey/edit'))
const Stat = lazy(() => import('../pages/survey/stat'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> }, // path: '/'
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          { index: true, element: <List /> }, // path: 'manage/'
          { path: 'list', element: <List /> },
          { path: 'star', element: <Star /> },
          { path: 'trash', element: <Trash /> },
        ],
      },
    ],
  },
  {
    path: '/survey',
    element: <SurveyLayout />,
    children: [
      { path: 'edit/:id', element: <Edit /> },
      { path: 'stat/:id', element: <Stat /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_LIST_PATHNAME = '/manage/list'
export const MANAGE_STAR_PATHNAME = '/manage/star'
export const MANAGE_TRASH_PATHNAME = '/manage/trash'
export const SURVEY_EDIT_PATH = (id: string) => `/survey/edit/${id}`
export const SURVEY_STATS_PATH = (id: string) => `/survey/stat/${id}`

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname))
    return true
  return false
}
