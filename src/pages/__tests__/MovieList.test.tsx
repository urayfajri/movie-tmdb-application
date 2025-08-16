import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MovieList from '../MovieList'
import * as api from '../../api/tmdb'

const mockedData = { page: 1, total_pages: 1, results: [{ id: 1, title: 'Mock', release_date: '2023-01-01', poster_path: null }] }

vi.spyOn(api, 'fetchMovies').mockResolvedValue(mockedData)
vi.spyOn(api, 'searchMovies').mockResolvedValue(mockedData)

function renderWithClient(ui: any) {
  const qc = new QueryClient()
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>)
}

test('shows movie from API', async () => {
  renderWithClient(<MovieList />)
  const el = await screen.findByText('Mock')
  expect(el).toBeInTheDocument()
})
