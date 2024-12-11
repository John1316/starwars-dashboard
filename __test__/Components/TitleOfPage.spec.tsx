import ContextWrappers from '@/context/ContextWrappers'
import TitleOfPage from '@/ui/components/common/pages/TitleOfPage'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('TitleOfPage Component', () => {
  it('renders the title correctly', () => {
    const testTitle = 'Test Title'
    render(<ContextWrappers><TitleOfPage title={testTitle}>
      <div>Test Child</div>
    </TitleOfPage></ContextWrappers>)

    const headingElement = screen.getByRole('heading', { level: 1 })
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent(testTitle)
  })

  it('renders children content', () => {
    const childText = 'Test Child Content'
    render(<TitleOfPage title="Any Title">
      <div>{childText}</div>
    </TitleOfPage>)

    expect(screen.getByText(childText)).toBeInTheDocument()
  })

  it('has the correct CSS classes', () => {
    render(<TitleOfPage title="Test">
      <div>Child</div>
    </TitleOfPage>)

    const container = screen.getByRole('heading', { level: 1 }).parentElement
    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('lg:flex-row')
    expect(container).toHaveClass('flex-col')
  })
})