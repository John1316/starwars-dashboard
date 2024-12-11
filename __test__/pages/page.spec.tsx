import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../../src/app/page'
import { describe, expect, it } from '@jest/globals'
import { PeopleContextProvider } from '@/context/PeopleContext'

describe('Home Component', () => {

  // Alternative: separate tests for each case
  it('should render either h1 or specific text', () => {
    render(<PeopleContextProvider><Home /></PeopleContextProvider>)
    
    const hasHeading = screen.queryByRole('heading', { level: 1 }) !== null
    const hasStarWarsText = screen.queryByText('Star Wars Characters') !== null
    
    expect(hasHeading || hasStarWarsText).toBe(true)
  })
})