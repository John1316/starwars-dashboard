type TableLayoutColumn = {
  key: string;
  label: string;
  render?: (data: any) => React.ReactNode | undefined;
  sortable?: boolean;
};
type TableProps = {
  /** Array of column definitions */
  columns: TableLayoutColumn[];
  /** Array of data to display */
  data: T[];
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (columnKey: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  /** Callback function when page changes */
  onPageChange: (page: number) => void;
  className?: string;
};

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
