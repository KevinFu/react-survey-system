import Mock from 'mockjs'
import getSurveyList from './data/getSurveyList'

const { Random } = Mock

export default [
  {
    // Create Survey
    url: '/api/survey',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: Mock.mock({
          id: Random.id(),
        }),
      }
    },
  },
  {
    // Get Survey info
    url: '/api/survey/:id',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: Mock.mock({
          id: Random.id(),
          name: '@name',
        }),
      }
    },
  },
  {
    // Get Survey List
    url: '/api/survey',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          list: getSurveyList(),
          total: 100,
        },
      }
    },
  },
  {
    // Update Survey
    url: '/api/survey/:id',
    method: 'patch',
    response: () => {
      return {
        code: 0,
      }
    },
  },
  {
    // Duplicate Survey
    url: '/api/survey/duplicate/:id',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: Mock.mock({
          id: Random.id(),
        }),
      }
    },
  },
  {
    // Delete Survey
    url: '/api/survey',
    method: 'delete',
    response: () => {
      return {
        code: 0,
      }
    },
  },
]
