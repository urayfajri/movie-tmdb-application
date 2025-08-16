import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MovieCard from '../MovieCard'

const movie = { id: 1, title: 'Test Movie', poster_path: null, release_date: '2024-01-01' }

test('renders title and year', () => {
  render(<MemoryRouter><MovieCard movie={movie} /></MemoryRouter>)
  expect(screen.getByText('Test Movie')).toBeInTheDocument()
  expect(screen.getByText('2024')).toBeInTheDocument()
})
