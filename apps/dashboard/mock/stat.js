import getStatList from './data/getStatList'

export default [
  {
    url: '/api/stat/:surveyId',
    method: 'get',
    response() {
      return {
        code: 0,
        data: {
          total: 100,
          list: getStatList(),
        },
      }
    },
  },
  {
    url: '/api/stat/:survey/:componentId',
    method: 'get',
    response() {
      return {
        code: 0,
        data: {
          stat: [
            { name: 'Option1', count: 20 },
            { name: 'Option2', count: 10 },
            { name: 'Option3', count: 25 },
          ],
        },
      }
    },
  },
]
