import { render, screen } from '@testing-library/react'
import SurveyTitle from './component'

test('render default props', () => {
  render(<SurveyTitle />)
  expect(screen.getByText('Survey Title')).toBeInTheDocument()
})

test('Passed-in props', () => {
  render(<SurveyTitle title="Hello" desc="world" />)

  expect(screen.getByText('Hello')).toBeInTheDocument()
  expect(screen.getByText('world')).toBeInTheDocument()
})

test('Multi-line description', () => {
  render(<SurveyTitle title="hello" desc={'a\nb\nc'} />)
  const span = screen.getByText('a')

  expect(span).toBeInTheDocument()
  expect(span).toHaveTextContent('a')
  expect(span).not.toHaveTextContent('ab')
})
