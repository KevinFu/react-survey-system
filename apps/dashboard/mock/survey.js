import Mock from 'mockjs'

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
]
