import Mock from 'mockjs'

export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: Mock.mock({
          name: '@name',
          age: '@integer(20, 50)',
          email: '@email',
        }),
      }
    },
  },
]
