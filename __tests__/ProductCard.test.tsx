// __tests__/ProductCard.test.tsx

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from '@/app/(app)/products/components/ProductCard'

jest.mock('@/app/(app)/products/components/DeleteProductButton', () => () => <div>Mocked Delete Button</div>)

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 49.99,
  description: 'Test desc',
  category: 'Books',
  image: 'https://example.com/image.jpg',
}

describe('ProductCard', () => {
  it('renders product title, category, description and price', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Books')).toBeInTheDocument()
    expect(screen.getByText('Test desc')).toBeInTheDocument()
    expect(screen.getByText('$49.99')).toBeInTheDocument()
  })
})
