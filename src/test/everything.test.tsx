// ShowComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ShowComponent from './ShowComponent';
import { MemoryRouter } from 'react-router-dom';

describe('ShowComponent', () => {
  const mockColumns = [
    {
      id: '1',
      header: 'Id',
      key: 'id',
      filter: 'id',
      children: [{ header: 'Test', key: 'test' }]
    }
  ];

  const mockItems = {
    subnet: [{
      id: '123',
      terminal: true
    }]
  };

  const defaultProps = {
    columns: mockColumns,
    error: null,
    isLoading: false,
    items: mockItems
  };

  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  test('renders loading spinner when isLoading is true', () => {
    renderWithRouter(
      <ShowComponent {...defaultProps} isLoading={true} />
    );
    expect(screen.getByClassName('spinner spinner-md')).toBeInTheDocument();
  });

  test('renders error message when error exists', () => {
    renderWithRouter(
      <ShowComponent {...defaultProps} error="Test error" />
    );
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('renders terminal status correctly', () => {
    renderWithRouter(<ShowComponent {...defaultProps} />);
    expect(screen.getByText('Is Terminal')).toBeInTheDocument();
    expect(screen.getByClassName('bg-puerto-rico')).toBeInTheDocument();
  });

  test('navigation tabs work correctly', () => {
    renderWithRouter(<ShowComponent {...defaultProps} />);
    const locationTab = screen.getByText('Location');
    fireEvent.click(locationTab);
    expect(locationTab).toHaveClass('active');
  });
});

// useSubnets.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useSubnets } from './useSubnets';

describe('useSubnets', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock localStorage
    const mockStorage = {
      'usedColumnLS': JSON.stringify(['id', 'name']),
      'NOTusedColumnLS': JSON.stringify(['vlan_id', 'vrf_id'])
    };
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockStorage[key]),
        setItem: jest.fn(),
      },
      writable: true
    });
  });

  test('initializes with correct column state', () => {
    const { result } = renderHook(() => useSubnets());
    expect(result.current.columns.usedColumn).toEqual(['id', 'name']);
    expect(result.current.columns.notUsedColumn).toEqual(['vlan_id', 'vrf_id']);
  });

  test('handles drag and drop correctly', async () => {
    const { result } = renderHook(() => useSubnets());
    
    await act(async () => {
      result.current.handleDragEnd({
        active: { id: 'id-1' },
        over: { id: 'id-2' }
      } as any);
    });

    expect(result.current.columns).toBeDefined();
  });

  test('filters update correctly', async () => {
    const { result } = renderHook(() => useSubnets());
    
    await act(async () => {
      result.current.updateFilters({
        environment: 'test',
        dhcp_client_type: 'static'
      });
    });

    expect(result.current.filters).toEqual({
      environment: 'test',
      dhcp_client_type: 'static'
    });
  });
});

// Table.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  const mockColumns = {
    usedColumn: ['id', 'name'],
    notUsedColumn: ['vlan_id']
  };

  const mockProps = {
    columns: mockColumns,
    filters: {},
    updateFilters: jest.fn(),
    data: [],
    selectedIds: [],
    onRowClick: jest.fn(),
    showSelectAll: true,
    onSelectAll: jest.fn(),
    isLoading: false
  };

  test('renders column headers correctly', () => {
    render(<Table {...mockProps} />);
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('handles row selection', () => {
    render(<Table {...mockProps} />);
    const row = screen.getByTestId('table-row-0');
    fireEvent.click(row);
    expect(mockProps.onRowClick).toHaveBeenCalled();
  });

  test('handles select all functionality', () => {
    render(<Table {...mockProps} />);
    const selectAllCheckbox = screen.getByTestId('select-all');
    fireEvent.click(selectAllCheckbox);
    expect(mockProps.onSelectAll).toHaveBeenCalled();
  });
});