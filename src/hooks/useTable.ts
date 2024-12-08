import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface TableConfig<T> {
  pageSize: number;
  sortConfig?: SortConfig<T>;
  searchQuery: string;
}

export function useTable<T>(
  data: T[],
  config: TableConfig<T>,
  searchFields: Array<keyof T>
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | undefined>(
    config.sortConfig
  );
  const [searchQuery, setSearchQuery] = useState(config.searchQuery);
  const [pageSize, setPageSize] = useState(config.pageSize);

  // Search
  const filteredData = data.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      return String(value)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    })
  );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: keyof T) => {
    setSortConfig((currentConfig) => {
      if (!currentConfig || currentConfig.key !== key) {
        return { key, direction: 'asc' };
      }
      if (currentConfig.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return undefined;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    data: paginatedData,
    currentPage,
    totalPages,
    pageSize,
    sortConfig,
    searchQuery,
    handleSort,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
  };
}