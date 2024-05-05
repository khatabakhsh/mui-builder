import { Fragment, memo } from 'react';

// *** Mui ***
import { TableBody, TableCell, TableRow } from '@mui/material';

import { useTableContext } from '../../context/store';

// *** Third-party packages ***
import { Row, flexRender } from '@tanstack/react-table';

// *** Styles and Types
import styles from './../styles';

const TableBodyComponent = () => {
  const { table, renderSubComponent } = useTableContext();

  return (
    <TableBody>
      {table.getRowModel().rows.map((row: Row<any>) => (
        <Fragment key={row.id}>
          <TableRow key={row.id} selected={row.getIsSelected()}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                sortDirection={cell.column.getAutoSortDir()}
                sx={styles.tableCellSx({
                  width: cell.column.getSize().toString(),
                  padding: ['expander', 'select'].some((item) => item === cell.column.id) ? '0px' : 'auto'
                })}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
          {row.getIsExpanded() && (
            <TableRow key={row.id}>
              <TableCell sx={{ padding: 0 }} colSpan={row.getVisibleCells().length}>
                {renderSubComponent?.({ row })}
              </TableCell>
            </TableRow>
          )}
        </Fragment>
      ))}
    </TableBody>
  );
};
export default memo(TableBodyComponent);
