import { render } from '@redwoodjs/testing/web'

import ReactSelectMultipleChoice from './ReactSelectMultipleChoice'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReactSelectMultipleChoice', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReactSelectMultipleChoice />)
    }).not.toThrow()
  })
})
