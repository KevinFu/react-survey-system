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
          title: Random.title(2),
          desc: Random.title(),
          css: '',
          js: '',
          componentList: [
            // Title
            {
              fe_id: Random.id(),
              type: 'surveyTitle',
              title: 'Title',
              isHidden: false,
              isLocked: false,
              props: {
                text: 'Personal Information Survey',
                level: 1,
                isCenter: false,
              },
            },
            // Input field 1
            {
              fe_id: Random.id(),
              type: 'surveyInput',
              title: 'Input Field 1',
              isHidden: false,
              isLocked: false,
              props: {
                title: 'Your Name',
                placeholder: 'Please enter your name...',
              },
            },
            // Input field 2
            {
              fe_id: Random.id(),
              type: 'surveyInput',
              title: 'Input Field 2',
              isHidden: false,
              isLocked: false,
              props: {
                title: 'Your Phone',
                placeholder: 'Please enter your phone number...',
              },
            },
          ],
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
