import Mock from 'mockjs'
const Random = Mock.Random

export default function getSurveyList(len = 10, isDeleted = false) {
  const list = []
  for (let i = 0; i < len; i++) {
    list.push({
      id: Random.id(),
      title: Random.title(),
      isPublished: Random.boolean(),
      isStar: Random.boolean(),
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted,
    })
  }
  return list
}
