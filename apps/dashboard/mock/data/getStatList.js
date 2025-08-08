import Mock from 'mockjs'
import getComponentList from './getComponentList'

const { Random } = Mock

export default function getStatList(len = 10) {
  const componentList = getComponentList()

  const res = []

  for (let i = 0; i < len; i++) {
    const stat = {
      _id: Random.id(),
    }

    componentList.forEach((c) => {
      const { fe_id, type, props } = c

      switch (type) {
        case 'surveyInput':
          stat[fe_id] = Random.title(1)
          break
        case 'surveyTextarea':
          stat[fe_id] = Random.title(1)
          break
        case 'surveyRadio':
          stat[fe_id] = props.options[0].text
          break
        case 'surveyCheckbox':
          stat[fe_id] = `${props.list[0].text},${props.list[1].text}`
          break
      }
    })

    res.push(stat)
  }

  return res
}
