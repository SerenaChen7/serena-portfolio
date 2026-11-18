import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the afternoon tea portfolio scene and navigation', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Serena Chen’s Portfolio' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Portfolio sections' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Projects/ })).toBeInTheDocument()
    expect(screen.getByAltText('Six cake slices arranged as a round cake')).toBeInTheDocument()
  })
})
