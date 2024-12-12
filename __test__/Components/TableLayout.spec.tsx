import TableLayout from '@/ui/components/common/Table/TableLayout'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  ChevronUp: () => <div data-testid="chevron-up">↑</div>,
  ChevronDown: () => <div data-testid="chevron-down">↓</div>,
  ChevronsUpDown: () => <div data-testid="chevrons-updown">↕</div>,
}))


describe('TableLayout Component', () => {
  // Test data setup
  const mockColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: false,
      render: (row: any) => <span data-testid="custom-render">{row.status}</span>
    }
  ]

  const mockData = [
    { name: 'Luke', age: 20, email: 'luke@rebels.com', status: 'Active' },
    { name: 'Leia', age: 21, email: 'leia@rebels.com', status: 'Inactive' }
  ]

  const defaultProps = {
    columns: mockColumns,
    data: mockData,
    sortColumn: '',
    sortDirection: 'asc' as const,
    onSort: jest.fn(),
    isLoading: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders table with correct columns and data', () => {
      render(<TableLayout {...defaultProps} />)
      
      // Check column headers
      mockColumns.forEach(column => {
        expect(screen.getByText(column.label)).toBeInTheDocument()
      })

      // Check data rows
      mockData.forEach(row => {
        expect(screen.getByText(row.name)).toBeInTheDocument()
        expect(screen.getByText(row.age.toString())).toBeInTheDocument()
        expect(screen.getByText(row.email)).toBeInTheDocument()
      })
    })

    it('renders loading screen when isLoading is true', () => {
      render(<TableLayout {...defaultProps} isLoading={true} />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders empty message when data is empty', () => {
      const emptyMessage = 'Custom empty message'
      render(<TableLayout {...defaultProps} data={[]} emptyMessage={emptyMessage} />)
      expect(screen.getByText(emptyMessage)).toBeInTheDocument()
    })

    it('renders custom cell content using render prop', () => {
      render(<TableLayout {...defaultProps} />)
      const customRenderedCells = screen.getAllByTestId('custom-render')
      expect(customRenderedCells).toHaveLength(mockData.length)
    })
  })

  describe('Sorting', () => {
    it('calls onSort with correct column key when clicking sortable column', () => {
      const onSort = jest.fn()
      render(<TableLayout {...defaultProps} onSort={onSort} />)
      
      const sortableHeader = screen.getByText('Name')
      fireEvent.click(sortableHeader)
      expect(onSort).toHaveBeenCalledWith('name')
    })

    it('does not call onSort when clicking non-sortable column', () => {
      const onSort = jest.fn()
      render(<TableLayout {...defaultProps} onSort={onSort} />)
      
      const nonSortableHeader = screen.getByText('Email')
      fireEvent.click(nonSortableHeader)
      expect(onSort).not.toHaveBeenCalled()
    })

    it('displays correct sort indicators', () => {
      render(
        <TableLayout 
          {...defaultProps} 
          sortColumn="name" 
          sortDirection="asc" 
        />
      )
      
      expect(screen.getByTestId('chevron-up')).toBeInTheDocument()
      
      render(
        <TableLayout 
          {...defaultProps} 
          sortColumn="name" 
          sortDirection="desc" 
        />
      )
      
      expect(screen.getByTestId('chevron-down')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies hover styles to table rows', () => {
      render(<TableLayout {...defaultProps} />)
      const rows = screen.getAllByRole('row')
      // Skip header row
      rows.slice(1).forEach(row => {
        expect(row).toHaveClass('hover:bg-[var(--rebel-yellow-overlay)]')
      })
    })

    it('applies correct border styles', () => {
      render(<TableLayout {...defaultProps} />)
      const table = screen.getByRole('table').parentElement
      expect(table).toHaveClass('border-2')
      expect(table).toHaveClass('border-[var(--rebel-yellow)]')
    })

    it('applies correct header styles', () => {
      render(<TableLayout {...defaultProps} />)
      const headers = screen.getAllByRole('columnheader')
      headers.forEach(header => {
        expect(header).toHaveClass('px-6')
        expect(header).toHaveClass('py-4')
        expect(header).toHaveClass('text-left')
      })
    })
  })

  describe('Accessibility', () => {
    it('has accessible table structure', () => {
      render(<TableLayout {...defaultProps} />)
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('columnheader')).toHaveLength(mockColumns.length)
      expect(screen.getAllByRole('row')).toHaveLength(mockData.length + 1) // +1 for header row
    })

    it('indicates sortable columns visually', () => {
      render(<TableLayout {...defaultProps} />)
      const sortableHeaders = mockColumns
        .filter(col => col.sortable)
        .map(col => screen.getByText(col.label))
      
      sortableHeaders.forEach(header => {
        expect(header.parentElement).toHaveClass('cursor-pointer')
        expect(header.parentElement).toHaveClass('hover:text-[var(--rebel-yellow)]')
      })
    })
  })
})