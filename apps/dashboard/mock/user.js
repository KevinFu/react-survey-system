import Mock from 'mockjs'

const { Random } = Mock

export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          username: Random.title(),
          nickname: Random.title(),
        },
      }
    },
  },
  {
    url: '/api/user/register',
    method: 'post',
    response: () => {
      return {
        code: 0,
      }
    },
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          token: Random.word(20),
        },
      }
    },
  },
]
