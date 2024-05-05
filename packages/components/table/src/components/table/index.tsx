'use client';

// *** React and Next ***
// *** Hooks and Context ***
import useTableConfigStore from '../../hooks/useTableConfigStore';
// *** Third-party packages ***
import {
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useEffect, useMemo, useState } from 'react';

import TableContent from './content';
import { TableContext } from './context/store';
import TablePagination from './pagination';
// *** Self created components ***
import TableToolbar from './toolbar';
// *** Styles and Types ***
import IProps from './types';

const MainTable = <TData,>({
  id,
  columns,
  data,
  renderSubComponent,
  options,
  tableContainerSx,
  tableSx,
}: IProps<TData>) => {

  const { configs, updateTableConfig } = useTableConfigStore();
  const [columnSizing, setColumnSizing] = useState(
    configs?.[id]?.columnSizing ||
      columns.reduce((a, v) => ({ ...a, [v.id as string]: v?.size }), {})
  );

  const allColumns = useMemo<IProps<TData>['columns']>(
    () => [
      ...columns.map((item) => ({
        ...item,
        size: columnSizing[item.id as string] || item.size,
      })),
    ],
    [columnSizing, columns]
  );

  const [isDense, setIsDense] = useState(configs?.[id]?.isDense || false);

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnOrder:
        configs?.[id]?.columnOrder ||
        (allColumns.map((c) => c.id) as string[]),
      columnVisibility: configs?.[id]?.columnVisibility || {},
      sorting: [] as SortingState,
      rowSelection: {},
    },
    state: {
      columnSizing,
    },
    onColumnSizingChange: setColumnSizing,
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    columnResizeMode: 'onChange',
    columnResizeDirection: 'rtl',
    ...options,
  });

  useEffect(() => {
    updateTableConfig(id, {
      isDense,
      columnVisibility: table.getState().columnVisibility,
      columnOrder: table.getState().columnOrder,
      columnSizing,
    });
  }, [allColumns, columnSizing, isDense, table, id, updateTableConfig]);

  return (
    <TableContext.Provider
      value={{
        id,
        allColumns,
        table,
        isDense,
        setIsDense,
        renderSubComponent,
        tableContainerSx,
        tableSx,
      }}
    >
      <TableToolbar />
      <TableContent />
      <TablePagination />
    </TableContext.Provider>
  );
};

export default MainTable;
