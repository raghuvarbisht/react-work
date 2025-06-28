import React, { useState, useMemo, useEffect } from 'react';
import './Table.css';

type Column = {
  label: string;
  accessor: string;
  sortable?: boolean;
};

type DynamicTableProps = {
  columns: Column[];
  data: Record<string, any>[];
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
  onSelectionChange?: (selected: Record<string, any>[]) => void;
};

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data, onEdit, onDelete, onSelectionChange }) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleSelectRow = (id: number) => {
    const newSelection = new Set(selectedRowIds);
    newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
    setSelectedRowIds(newSelection);
  };

  const handleSelectAll = (checked: boolean, currentIds: number[]) => {
    const newSelection = new Set(selectedRowIds);
    if (checked) {
      currentIds.forEach((id) => newSelection.add(id));
    } else {
      currentIds.forEach((id) => newSelection.delete(id));
    }
    setSelectedRowIds(newSelection);
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, columns]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  const visibleRowIds = sortedData.map((row) => row.id);

  const allVisibleSelected = visibleRowIds.every((id) => selectedRowIds.has(id));

  useEffect(() => {
    const selectedData = data.filter((row) => selectedRowIds.has(row.id));
    onSelectionChange?.(selectedData);
  }, [selectedRowIds, data, onSelectionChange]);

  return (
    <div className="table-wrapper">
      <div>  
        <input
            type="text"
            placeholder="Search..."
            className="table-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="dynamic-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={(e) => handleSelectAll(e.target.checked, visibleRowIds)}
              />
            </th>
            {columns.map((col) => (
              <th key={col.accessor} onClick={() => col.sortable && handleSort(col.accessor)}>
                {col.label}
                {col.sortable && sortField === col.accessor && (
                  <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRowIds.has(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </td>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
              <td>
                <button onClick={() => onEdit?.(row)}>Edit</button>
                <button onClick={() => onDelete?.(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
