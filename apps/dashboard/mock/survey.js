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
    // Get Survey Info
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
          isPublish: true,
          componentList: [
            // Survey Info Component
            {
              fe_id: 'c1',
              type: 'surveyInfo',
              title: 'Survey Info',
              isHidden: false,
              isLocked: false,
              props: { title: 'Survey Title', desc: 'Survey description...' },
            },
            // Title Component
            {
              fe_id: 'c2',
              type: 'surveyTitle',
              title: 'Title',
              isHidden: false,
              isLocked: false,
              props: {
                text: 'Personal Info Survey',
                level: 1,
                isCenter: false,
              },
            },
            // Input Field 1
            {
              fe_id: 'c3',
              type: 'surveyInput',
              title: 'Input 1',
              isHidden: false,
              isLocked: false,
              props: {
                title: 'Your Name',
                placeholder: 'Please enter your name...',
              },
            },
            // Input Field 2
            {
              fe_id: 'c4',
              type: 'surveyInput',
              title: 'Input 2',
              isHidden: false,
              isLocked: false,
              props: {
                title: 'Your Phone Number',
                placeholder: 'Please enter your phone number...',
              },
            },
            // Textarea Component
            {
              fe_id: 'c5',
              type: 'surveyTextarea',
              title: 'Multiline Input',
              isHidden: false,
              isLocked: false,
              props: { title: 'Your Hobbies', placeholder: 'Please enter...' },
            },
            // Paragraph Component
            {
              fe_id: 'c6',
              type: 'surveyParagraph',
              title: 'Paragraph',
              isHidden: false,
              isLocked: false,
              props: {
                text: 'Paragraph line 1\nParagraph line 2',
                isCenter: false,
              },
            },
            // Radio Component
            {
              fe_id: 'c7',
              type: 'surveyRadio',
              title: 'Single Choice',
              isHidden: false,
              isLocked: false,
              props: {
                title: 'Single Choice Title',
                isVertical: false,
                options: [
                  { value: 'item1', text: 'Option 1' },
                  { value: 'item2', text: 'Option 2' },
                  { value: 'item3', text: 'Option 3' },
                ],
                value: '',
              },
            },
            // Checkbox Component
            {
              fe_id: 'c8',
              type: 'surveyCheckbox',
              title: 'Multiple Choice',
              isHidden: false,
              isLocked: false,
              props: {
                title: 'Multiple Choice Title',
                isVertical: false,
                list: [
                  { value: 'item1', text: 'Option 1', checked: true },
                  { value: 'item2', text: 'Option 2', checked: false },
                  { value: 'item3', text: 'Option 3', checked: false },
                ],
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
